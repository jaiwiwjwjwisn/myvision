import { drawImageFromList, getImageProperties, calculateCurrentImageHeightRatio } from '../toolkit/buttonClickEvents/facadeWorkersUtils/uploadFile/drawImageOnCanvas';
import { removeAndRetrieveAllShapeRefs, getNumberOfShapes } from '../../canvas/objects/allShapes/allShapes';
import { removeAndRetrieveAllLabelRefs } from '../../canvas/objects/label/label';
import { repopulateLabelAndShapeObjects, setShapeMovablePropertiesOnImageSelect } from '../../canvas/objects/allShapes/labelAndShapeBuilder';
import { resetZoom, zoomOutObjectOnImageSelect, switchCanvasWrapperInnerElement } from '../toolkit/buttonClickEvents/facadeWorkers/zoomWorker';
import { removeAllLabelListItems } from '../labelList/labelList';
import { setDefaultState } from '../toolkit/buttonClickEvents/facadeWorkersUtils/stateManager';
import { switchCanvasWrapperInnerElementsDisplay } from '../../canvas/utils/canvasUtils';
import labelProperties from '../../canvas/objects/label/properties';

let currentImageNameElement = null;
let currentlyActiveElement = null;
const images = [];
let currentlySelectedImageId = 0;
let newImageId = 0;
let firstImage = true;
let imageListOverflowParent = null;

function findImageListElement() {
  currentImageNameElement = document.getElementById('currentImageName');
  imageListOverflowParent = document.getElementById('image-list-overflow-parent');
}

function initialiseImageListFunctionality() {
  findImageListElement();
}

function getAllImageData() {
  return images;
}

function initialiseImageElement() {
  return document.createElement('img');
}

function initiateDivElement() {
  return document.createElement('div');
}

function addNewItemToImageList(imageData) {
  const imageThumbnailElement = initialiseImageElement();
  imageThumbnailElement.id = newImageId;
  imageThumbnailElement.classList.add('image-list-thumbnail-image');
  imageThumbnailElement.src = imageData.src;
  const colorOverlayElement = initiateDivElement();
  colorOverlayElement.classList.add('image-list-thumbnail-color-overlay');
  const tickSVGElement = initialiseImageElement();
  tickSVGElement.classList.add('image-list-thumbnail-SVG-tick-icon');
  tickSVGElement.src = 'done-tick-highlighted.svg';
  const parentThumbnailDivElement = initiateDivElement();
  parentThumbnailDivElement.classList.add('image-list-thumbnail');
  parentThumbnailDivElement.onclick = window.switchImage.bind(this, newImageId);
  parentThumbnailDivElement.appendChild(imageThumbnailElement);
  parentThumbnailDivElement.appendChild(colorOverlayElement);
  parentThumbnailDivElement.appendChild(tickSVGElement);
  imageListOverflowParent.appendChild(parentThumbnailDivElement);
  return parentThumbnailDivElement;
}

function displayTickSVGOverImageThumbnail() {
  images[currentlySelectedImageId].thumbnailElementRef.childNodes[2].style.display = 'block';
}

function removeTickSVGOverImageThumbnail() {
  if (getNumberOfShapes() === 0) {
    images[currentlySelectedImageId].thumbnailElementRef.childNodes[2].style.display = 'none';
  }
}

window.highlightImageThumbnail = (element) => {
  if (currentlyActiveElement) {
    currentlyActiveElement.style.display = 'none';
  }
  element.style.display = 'block';
  currentlyActiveElement = element;
};

function addNewImage(imageName, imageData) {
  const thumbnailElementRef = addNewItemToImageList(imageData);
  const imageObject = {
    data: imageData, name: imageName, shapes: {}, labels: {}, thumbnailElementRef,
  };
  images.push(imageObject);
}

function saveAndRemoveCurrentImageDetails() {
  if (!firstImage) {
    images[currentlySelectedImageId].shapes = removeAndRetrieveAllShapeRefs();
    images[currentlySelectedImageId].labels = removeAndRetrieveAllLabelRefs();
    const currentlySelectedImageProperties = getImageProperties();
    images[currentlySelectedImageId].imageDimensions = {};
    images[currentlySelectedImageId].imageDimensions.scaleX = currentlySelectedImageProperties.scaleX;
    images[currentlySelectedImageId].imageDimensions.scaleY = currentlySelectedImageProperties.scaleY;
  }
  removeAllLabelListItems();
  const timesZoomedOut = resetZoom(false);
  zoomOutObjectOnImageSelect(images[currentlySelectedImageId].shapes,
    images[currentlySelectedImageId].labels, timesZoomedOut);
  currentlySelectedImageId = newImageId;
  firstImage = false;
}

function addSingleImageToList(imageMetadata, imageData) {
  addNewImage(imageMetadata.name, imageData);
  saveAndRemoveCurrentImageDetails();
  currentImageNameElement.innerHTML = imageMetadata.name;
  window.highlightImageThumbnail(images[newImageId].thumbnailElementRef.childNodes[1]);
  images[newImageId].size = imageMetadata.size;
  images[newImageId].thumbnailElementRef.scrollIntoView();
  images[newImageId].imageDimensions = {};
  newImageId += 1;
}

function addImageFromMultiUploadToList(imageName, imageData, firstFromMany) {
  addNewImage(imageName, imageData);
  if (firstFromMany) {
    saveAndRemoveCurrentImageDetails();
    currentImageNameElement.innerHTML = imageName;
    window.highlightImageThumbnail(images[newImageId].thumbnailElementRef.childNodes[1]);
    images[newImageId].thumbnailElementRef.scrollIntoView();
  }
  newImageId += 1;
}

function changeCurrentImageElementText(id) {
  currentImageNameElement.innerHTML = images[id].name;
}

function isElementHeightFullyVisibleInParent(childElement, parentElement) {
  const childBoundingRect = childElement.getBoundingClientRect();
  const parentBoundingRect = parentElement.getBoundingClientRect();
  if (childBoundingRect.top < parentBoundingRect.top
    || childBoundingRect.bottom > parentBoundingRect.bottom) {
    return false;
  }
  return true;
}

function scrollIntoViewIfNeeded(childElement, parentElement) {
  if (!isElementHeightFullyVisibleInParent(childElement, parentElement)) {
    childElement.scrollIntoView();
  }
}

function captureCurrentImageData() {
  images[currentlySelectedImageId].shapes = removeAndRetrieveAllShapeRefs();
  images[currentlySelectedImageId].labels = removeAndRetrieveAllLabelRefs();
  const currentlySelectedImageProperties = getImageProperties();
  const imageDimensions = {};
  imageDimensions.scaleX = currentlySelectedImageProperties.scaleX;
  imageDimensions.scaleY = currentlySelectedImageProperties.scaleY;
  imageDimensions.originalWidth = currentlySelectedImageProperties.originalWidth;
  imageDimensions.originalHeight = currentlySelectedImageProperties.originalHeight;
  imageDimensions.oldImageHeightRatio = calculateCurrentImageHeightRatio();
  imageDimensions.polygonOffsetLeft = labelProperties.pointOffsetProperties().left;
  imageDimensions.polygonOffsetTop = labelProperties.pointOffsetProperties().top;
  images[currentlySelectedImageId].imageDimensions = imageDimensions;
}

// the reason why we do not use scaleX/scaleY is because these are returned in
// a promise as the image is drawn hence we do not have it at this time
function changeToExistingImage(id) {
  setDefaultState(false);
  captureCurrentImageData();
  // the above should be moved to the on-resize event handler
  removeAllLabelListItems();
  const timesZoomedOut = resetZoom(true);
  drawImageFromList(images[id].data);
  repopulateLabelAndShapeObjects(images[id].shapes, images[id].labels, images[id].imageDimensions);
  switchCanvasWrapperInnerElementsDisplay();
  setShapeMovablePropertiesOnImageSelect(images[id].shapes);
  zoomOutObjectOnImageSelect(images[currentlySelectedImageId].shapes,
    images[currentlySelectedImageId].labels, timesZoomedOut);
  currentlySelectedImageId = id;
  switchCanvasWrapperInnerElement();
  changeCurrentImageElementText(id);
  window.highlightImageThumbnail(images[id].thumbnailElementRef.childNodes[1]);
  scrollIntoViewIfNeeded(images[id].thumbnailElementRef, imageListOverflowParent);
}

function switchImage(direction) {
  if (direction === 'previous') {
    if (currentlySelectedImageId !== 0) {
      changeToExistingImage(currentlySelectedImageId - 1);
    }
  } else if (direction === 'next') {
    if (currentlySelectedImageId !== images.length - 1) {
      changeToExistingImage(currentlySelectedImageId + 1);
    }
  } else if (direction !== currentlySelectedImageId) {
    changeToExistingImage(direction);
  }
}

function canSwitchImage(direction) {
  if (direction === 'previous') {
    return currentlySelectedImageId > 0;
  }
  if (direction === 'next') {
    return currentlySelectedImageId < (images.length - 1);
  }
  return direction !== currentlySelectedImageId;
}

export {
  switchImage, canSwitchImage, addImageFromMultiUploadToList,
  displayTickSVGOverImageThumbnail, removeTickSVGOverImageThumbnail,
  initialiseImageListFunctionality, addSingleImageToList, getAllImageData,
};
