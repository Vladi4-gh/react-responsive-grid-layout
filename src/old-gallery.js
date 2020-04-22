// https://strml.github.io/react-grid-layout/examples/15-drag-from-outside.html

(function($, _, window) {
    "use strict";

    $.photographGallery = function(element, options) {
      var defaults = {
        additionalCssClass: "",
        getDataAction: {
          type: "GET",
          url: ""
        },
        categoryAlias: null,
        numberOfPhotographsToLoad: 50,
        cellSize: {
          width: 100,
          height: 100
        },
        galleryPadding: 5,
        galleryItemHtmlTag: "div",
        galleryItemAdditionalCssClass: "",
        galleryItemPadding: 5,
        galleryItemDisplayAnimationMarginTop: 30,
        galleryItemDisplayAnimationDuration: 300,
        galleryItemPhotographWrapperBorderWidth: 1,
        texts: {
          photographsLoadingText: "<i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw' title='Фотографии загружаются...'></i>",
          noPhotographsLoadedAndGalleryEmptyText: null,
          noPhotographsLoadedButGalleryNotEmptyText: null
        }
      };

      var photographGallery = this;
      var $photographGalleryItemsContainer;

      var $window = $(window);
      var galleryItemsContainerWidth = 0;
      var tryLoadPhotographs = true;
      var skipNumber = 0;
      var positionForInsertion = {
        column: 0,
        row: 0
      };

      var currentGetPhotographsAjaxRequest = null;

      photographGallery.columns = [];
      photographGallery.galleryItems = [];

      photographGallery.changePhotographCategory = changePhotographCategory;

      function createPhotographGallery() {
        photographGallery.settings = $.extend(true, defaults, options);
        photographGallery.element = $(element);

        photographGallery.element
          .addClass("photograph-gallery " + photographGallery.settings.additionalCssClass)
          .css({
            padding: photographGallery.settings.galleryPadding
          })
          .append(createPhotographGalleryItemsContainer())
          .append(createPhotographGallerySlider());
      }

      function createPhotographGalleryItemsContainer() {
        $photographGalleryItemsContainer = $("<div class='photograph-gallery-items-container'></div>");

        return $photographGalleryItemsContainer;
      }

      function createPhotographGallerySlider() {
        var $photographGallerySlider = $("<div></div>").photographGallerySlider();
        var $photographGallerySliderData = $photographGallerySlider.data("photographGallerySlider");

        $photographGallerySliderData.gallery = photographGallery;

        photographGallery.slider = $photographGallerySliderData;

        return $photographGallerySlider;
      }

      function calculateColumns() {
        photographGallery.columns = [];

        var numberOfColumns = Math.ceil(galleryItemsContainerWidth / photographGallery.settings.cellSize.width);
        var columnWidth = Math.floor(galleryItemsContainerWidth / numberOfColumns);
        var galleryWidthLeft = galleryItemsContainerWidth - (columnWidth * numberOfColumns);
        var leftPosition = 0;

        for (var i = 0; i < numberOfColumns; i++) {
          var currentColumnWidth = galleryWidthLeft > 0 ? columnWidth + 1 : columnWidth;

          photographGallery.columns.push({
            width: currentColumnWidth,
            height: 0,
            left: leftPosition
          });

          galleryWidthLeft--;
          leftPosition += currentColumnWidth;
        }
      }

      function movePositionForInsertion() {
        var isPositionFound = false;

        do {
          for (var i = positionForInsertion.column; i < photographGallery.columns.length; i++) {
            if (positionForInsertion.row === photographGallery.columns[i].height) {
              isPositionFound = true;
              positionForInsertion.column = i;

              break;
            }
          }

          if (!isPositionFound) {
            positionForInsertion.column = 0;
            positionForInsertion.row++;
          }
        } while (!isPositionFound);
      }

      function getEmptyColumnsInRowNumber() {
        var emptyColumnsInRowNumber = 0;

        for (var i = positionForInsertion.column; i < photographGallery.columns.length; i++) {
          if (photographGallery.columns[i].height === positionForInsertion.row) {
            emptyColumnsInRowNumber++;
          } else {
            break;
          }
        }

        return emptyColumnsInRowNumber;
      }

      function getCurrentCellHeight() {
        return photographGallery.columns[photographGallery.columns.length - 1].width;
      }

      function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function calculateGalleryItemBlock(dataItem) {
        var maxBlockColumnsNumber = Math.floor(dataItem.galleryItemImageFile.width / photographGallery.settings.cellSize.width) || 1;
        var maxBlockRowsNumber = Math.floor(dataItem.galleryItemImageFile.height / photographGallery.settings.cellSize.height) || 1;

        movePositionForInsertion();

        var emptyColumnsInRowNumber = getEmptyColumnsInRowNumber();
        var blockColumnsNumber = getRandomInRange(1, emptyColumnsInRowNumber > maxBlockColumnsNumber ? maxBlockColumnsNumber: emptyColumnsInRowNumber);
        var blockRowsNumber = maxBlockColumnsNumber > maxBlockRowsNumber ? getRandomInRange((blockColumnsNumber - 1) || 1, blockColumnsNumber) : getRandomInRange(blockColumnsNumber, blockColumnsNumber + 1);

        if (blockRowsNumber > maxBlockRowsNumber) {
          blockRowsNumber = maxBlockRowsNumber;
        }

        return calculateGalleryItemBlockProperties(positionForInsertion.column, positionForInsertion.row, blockColumnsNumber, blockRowsNumber, dataItem.galleryItemImageFile.width, dataItem.galleryItemImageFile.height);
      }

      function calculateGalleryItemBlockProperties(blockColumn, blockRow, blockColumnsNumber, blockRowsNumber, galleryItemImageFileWidth, galleryItemImageFileHeight) {
        var galleryItemBlockWidth = 0;

        for (var i = 0; i < blockColumnsNumber; i++) {
          var currentColumn = photographGallery.columns[blockColumn + i];

          galleryItemBlockWidth += currentColumn.width;
          currentColumn.height += blockRowsNumber;
        }

        var currentCellHeight = getCurrentCellHeight();
        var galleryItemBlockHeight = currentCellHeight * blockRowsNumber;
        var photographProperties = calculatePhotographProperties(galleryItemBlockWidth, galleryItemBlockHeight, galleryItemImageFileWidth, galleryItemImageFileHeight);

        return {
          galleryItemBlockColumn: blockColumn,
          galleryItemBlockRow: blockRow,
          galleryItemBlockColumnsNumber: blockColumnsNumber,
          galleryItemBlockRowsNumber: blockRowsNumber,
          galleryItemBlockWidth: galleryItemBlockWidth,
          galleryItemBlockHeight: galleryItemBlockHeight,
          galleryItemBlockLeft: photographGallery.columns[blockColumn].left,
          galleryItemBlockTop: blockRow * currentCellHeight,
          galleryItemPhotographWidth: photographProperties.width,
          galleryItemPhotographHeight: photographProperties.height,
          galleryItemPhotographLeft: photographProperties.left,
          galleryItemPhotographTop: photographProperties.top
        };
      }

      function calculatePhotographProperties(galleryItemBlockWidth, galleryItemBlockHeight, galleryItemImageFileWidth, galleryItemImageFileHeight) {
        var galleryItemPhotographWrapperIndent = (photographGallery.settings.galleryItemPadding * 2) + (photographGallery.settings.galleryItemPhotographWrapperBorderWidth * 2);
        var galleryItemPhotographWrapperWidth = galleryItemBlockWidth - galleryItemPhotographWrapperIndent;
        var galleryItemPhotographWrapperHeight = galleryItemBlockHeight - galleryItemPhotographWrapperIndent;
        var ratio = Math.max(galleryItemPhotographWrapperWidth / galleryItemImageFileWidth, galleryItemPhotographWrapperHeight / galleryItemImageFileHeight);
        var width = Math.ceil(galleryItemImageFileWidth * ratio);
        var height = Math.ceil(galleryItemImageFileHeight * ratio);

        return {
          width: width,
          height: height,
          left: width > galleryItemPhotographWrapperWidth ? (width - galleryItemPhotographWrapperWidth) / -2 : 0,
          top: height > galleryItemPhotographWrapperHeight ? (height - galleryItemPhotographWrapperHeight) / -2 : 0
        };
      }

      function setGalleryItemsContainerHeightByHighestColumn() {
        var highestColumnHeight = _.max(photographGallery.columns, function(column) {
          return column.height;
        }).height;

        $photographGalleryItemsContainer.height(highestColumnHeight * getCurrentCellHeight());
      }

      function createGalleryItem(calculatedBlock) {
        return $(
          "<" + photographGallery.settings.galleryItemHtmlTag + " " +
            "class='photograph-gallery-item " + photographGallery.settings.galleryItemAdditionalCssClass + "' " +
            "data-photograph-gallery-item-id='" + (photographGallery.galleryItems.length + 1) + "' " +
            "style='width: " + calculatedBlock.galleryItemBlockWidth + "px; " +
            "height: " + calculatedBlock.galleryItemBlockHeight + "px; " +
            "left: " + calculatedBlock.galleryItemBlockLeft + "px; " +
            "top: " + calculatedBlock.galleryItemBlockTop + "px; " +
            "padding: " + photographGallery.settings.galleryItemPadding + "px; " +
            "opacity: 0; " +
            "visibility: hidden;'" +
          ">" +
            "<div class='photograph-wrapper' " +
              "style='border-width: " + photographGallery.settings.galleryItemPhotographWrapperBorderWidth + "px;'" +
            ">" +
              "<div class='photograph-loading-spinner-container'>" +
                "<i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i>" +
              "</div>" +
              "<img class='photograph' style='width: " + calculatedBlock.galleryItemPhotographWidth + "px; height: " + calculatedBlock.galleryItemPhotographHeight + "px; left: " + calculatedBlock.galleryItemPhotographLeft + "px; top: " + calculatedBlock.galleryItemPhotographTop + "px; display: none;'>" +
            "</div>" +
          "</" + photographGallery.settings.galleryItemHtmlTag + ">");
      }

      function addPhotographsToGalleryItemsContainer(data) {
        _.forEach(data, function(x) {
          var calculatedGalleryItemBlock = calculateGalleryItemBlock(x);
          var $galleryItem = createGalleryItem(calculatedGalleryItemBlock);

          $galleryItem.find("img")
            .attr("src", x.galleryItemImageFile.url)
            .attr("width", x.galleryItemImageFile.width)
            .attr("height", x.galleryItemImageFile.height)
            .attr("alt", x.description)
            .one("load", function() {
              var $photograph = $(this);

              $photograph.siblings(".photograph-loading-spinner-container").remove();
              $photograph.show();
            });

          $photographGalleryItemsContainer.append($galleryItem);

          photographGallery.galleryItems.push({
            id: photographGallery.galleryItems.length + 1,
            item: $galleryItem,
            itemData: x,
            calculatedProperties: calculatedGalleryItemBlock,
            isShown: false
          });

          setGalleryItemsContainerHeightByHighestColumn();
        });
      }

      function getPhotographs() {
        currentGetPhotographsAjaxRequest = $.ajax({
          type: photographGallery.settings.getDataAction.type,
          url: photographGallery.settings.getDataAction.url,
          data: {
            categoryAlias: photographGallery.settings.categoryAlias,
            skipNumber: skipNumber,
            takeNumber: photographGallery.settings.numberOfPhotographsToLoad
          },
          beforeSend: function() {
            toggleMessageUnderGalleryItemsContainer(photographGallery.settings.texts.photographsLoadingText);
          },
          success: function(data) {
            var receivedData = JSON.parse(data);

            if (receivedData.length !== 0) {
              addPhotographsToGalleryItemsContainer(receivedData);

              skipNumber += photographGallery.settings.numberOfPhotographsToLoad;

              toggleMessageUnderGalleryItemsContainer(null);

              showHiddenGalleryItems();
            } else {
              tryLoadPhotographs = false;

              if (photographGallery.galleryItems.length === 0) {
                toggleMessageUnderGalleryItemsContainer(photographGallery.settings.texts.noPhotographsLoadedAndGalleryEmptyText);
              } else {
                toggleMessageUnderGalleryItemsContainer(photographGallery.settings.texts.noPhotographsLoadedButGalleryNotEmptyText);
              }
            }
          },
          error: function(data) {
            if (data.statusText === "abort") {
              toggleMessageUnderGalleryItemsContainer(null);
            } else {
              tryLoadPhotographs = false;

              console.error("Произошла ошибка при получении фотографий!");

              if (photographGallery.galleryItems.length === 0) {
                toggleMessageUnderGalleryItemsContainer(photographGallery.settings.texts.noPhotographsLoadedAndGalleryEmptyText);
              } else {
                toggleMessageUnderGalleryItemsContainer(photographGallery.settings.texts.noPhotographsLoadedButGalleryNotEmptyText);
              }
            }
          },
          complete: function() {
            currentGetPhotographsAjaxRequest = null;
          }
        });
      }

      function toggleMessageUnderGalleryItemsContainer(message) {
        if (message) {
          var $photographGalleryMessageBox = $photographGalleryItemsContainer.siblings(".photograph-gallery-message-box");

          if ($photographGalleryMessageBox.length === 0) {
            $("<div class='photograph-gallery-message-box'>" + message + "</div>").insertAfter($photographGalleryItemsContainer);
          } else {
            $photographGalleryMessageBox.html(message);
          }
        } else {
          $photographGalleryItemsContainer.siblings(".photograph-gallery-message-box").remove();
        }
      }

      function showHiddenGalleryItems() {
        if (tryLoadPhotographs) {
          var scrollBottom = $window.scrollTop() + $window.height();
          var galleryItemsContainerPositionTop = $photographGalleryItemsContainer.position().top;
          var showlinePositionTop = scrollBottom - galleryItemsContainerPositionTop - (getCurrentCellHeight() / 2);
          var itemsToShow = _.filter(photographGallery.galleryItems, function(x) {
            return x.calculatedProperties.galleryItemBlockTop <= showlinePositionTop && x.isShown === false;
          });

          if (itemsToShow.length > 0) {
            var isLastHiddenGalleryItemHasBeenShown = false;

            _.forEach(itemsToShow, function(x) {
              x.isShown = true;

              x.item
                .css({
                  "margin-top": photographGallery.settings.galleryItemDisplayAnimationMarginTop,
                  visibility: "visible"
                })
                .animate({
                  "margin-top": 0,
                  opacity: 1
                },
                {
                  duration: photographGallery.settings.galleryItemDisplayAnimationDuration
                });

              if (x.id === photographGallery.galleryItems.length) {
                isLastHiddenGalleryItemHasBeenShown = true;
              }
            });

            if (isLastHiddenGalleryItemHasBeenShown) {
              getPhotographs();
            }
          }
        }
      }

      function resizeGalleryItems() {
        var oldNumberOfColumns = photographGallery.columns.length;

        calculateColumns();

        var currentNumberOfColumns = photographGallery.columns.length;

        if (oldNumberOfColumns !== currentNumberOfColumns) {
          positionForInsertion = {
            column: 0,
            row: 0
          };

          _.forEach(photographGallery.galleryItems, function(x) {
            var calculatedGalleryItemBlock = calculateGalleryItemBlock(x.itemData);

            x.calculatedProperties = calculatedGalleryItemBlock;
            resizeGalleryItem(calculatedGalleryItemBlock, x.item);
          });
        } else {
          _.forEach(photographGallery.galleryItems, function(x) {
            var calculatedGalleryItemBlockProperties = calculateGalleryItemBlockProperties(x.calculatedProperties.galleryItemBlockColumn, x.calculatedProperties.galleryItemBlockRow, x.calculatedProperties.galleryItemBlockColumnsNumber, x.calculatedProperties.galleryItemBlockRowsNumber, x.itemData.galleryItemImageFile.width, x.itemData.galleryItemImageFile.height);

            x.calculatedProperties = calculatedGalleryItemBlockProperties;
            resizeGalleryItem(calculatedGalleryItemBlockProperties, x.item);
          });
        }

        setGalleryItemsContainerHeightByHighestColumn();
        showHiddenGalleryItems();
      }

      function resizeGalleryItem(calculatedBlock, $galleryItem) {
        $galleryItem.css({
          width: calculatedBlock.galleryItemBlockWidth,
          height: calculatedBlock.galleryItemBlockHeight,
          left: calculatedBlock.galleryItemBlockLeft,
          top: calculatedBlock.galleryItemBlockTop
        }).find("img").css({
          width: calculatedBlock.galleryItemPhotographWidth,
          height: calculatedBlock.galleryItemPhotographHeight,
          left: calculatedBlock.galleryItemPhotographLeft,
          top: calculatedBlock.galleryItemPhotographTop
        });
      }

      function resetGallery() {
        if (currentGetPhotographsAjaxRequest != null) {
          currentGetPhotographsAjaxRequest.abort();
        }

        $photographGalleryItemsContainer.empty().height(0);

        photographGallery.galleryItems = [];

        tryLoadPhotographs = true;
        skipNumber = 0;
        positionForInsertion = {
          column: 0,
          row: 0
        };

        _.forEach(photographGallery.columns, function(x) {
          x.height = 0;
        });
      }

      function changePhotographCategory(photographCategoryAlias) {
        resetGallery();

        photographGallery.settings.categoryAlias = photographCategoryAlias;

        getPhotographs();
      }

      function initializeEventHandlers() {
        $window.scroll(function() {
          showHiddenGalleryItems();
        });

        $window.resize(function() {
          var currentGalleryItemsContainerWidth = $photographGalleryItemsContainer.width();

          if (currentGalleryItemsContainerWidth !== galleryItemsContainerWidth) {
            galleryItemsContainerWidth = currentGalleryItemsContainerWidth;

            resizeGalleryItems();
          }
        });

        photographGallery.element.on("click", ".photograph-gallery-item > .photograph-wrapper > .photograph", function() {
          var galleryItemId = $(this).closest(".photograph-gallery-item").data("photograph-gallery-item-id");

          photographGallery.slider.showPhotograph(galleryItemId);
        });
      }

      (function() {
        createPhotographGallery();

        galleryItemsContainerWidth = $photographGalleryItemsContainer.width();

        calculateColumns();
        initializeEventHandlers();

        getPhotographs();
      })();
    };

    $.fn.photographGallery = function(options) {
      return this.each(function() {
        var $this = $(this);

        if (!$this.data("photographGallery")) {
          $this.data("photographGallery", new $.photographGallery(this, options));
        }
      });
    };
  })(jQuery, _, window);