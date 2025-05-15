/**
 * Image Comparison Popup
 * 
 * A reusable JavaScript module for comparing before and after images
 * with slider functionality.
 */

// Global scope for the ImageComparison object
window.ImageComparison = (function() {
    // DOM elements
    let popup, popupTitle, popupClose, container;
    let beforeContainer, separator, handle, beforeImg, afterImg;
    let qualitySlider, qualityNumber;
    
    // Config
    let config = {
        onQualityChange: null,
        qualityControlVisible: true,
        qualityControlLabel: 'Quality:',
        qualityMin: 1,
        qualityMax: 100,
        qualityDefault: 80
    };
    
    // Current data
    let currentData = null;

    /**
     * Initialize the comparison popup
     * @param {Object} options - Configuration options
     */
    function init(options) {
        if (options) {
            config = {...config, ...options};
        }

        // Create the popup if it doesn't exist
        if (!document.getElementById('comparison-popup')) {
            createPopupElement();
        }
        
        // Get popup elements
        popup = document.getElementById('comparison-popup');
        popupTitle = document.getElementById('comparison-popup-title');
        popupClose = document.getElementById('comparison-popup-close');
        container = document.getElementById('comparison-container');
        beforeContainer = document.getElementById('comparison-before-container');
        separator = document.getElementById('comparison-separator');
        handle = document.getElementById('comparison-handle');
        beforeImg = document.getElementById('comparison-before');
        afterImg = document.getElementById('comparison-after');
        qualitySlider = document.getElementById('comparison-quality-slider');
        qualityNumber = document.getElementById('comparison-quality-number');

        // Set up quality control visibility based on config
        const qualityControls = document.getElementById('comparison-popup-controls');
        if (qualityControls) {
            qualityControls.style.display = config.qualityControlVisible ? 'block' : 'none';
        }
        
        // Update quality label if needed
        const qualityLabel = document.querySelector('label[for="comparison-quality-slider"]');
        if (qualityLabel) {
            qualityLabel.textContent = config.qualityControlLabel;
        }
        
        // Set quality min, max, default values
        if (qualitySlider) {
            qualitySlider.min = config.qualityMin;
            qualitySlider.max = config.qualityMax;
            qualitySlider.value = config.qualityDefault;
        }
        
        if (qualityNumber) {
            qualityNumber.min = config.qualityMin;
            qualityNumber.max = config.qualityMax;
            qualityNumber.value = config.qualityDefault;
        }
        
        // Set up event listeners
        initEventListeners();
    }

    /**
     * Create the popup DOM element
     */
    function createPopupElement() {
        // Create popup element
        const popupElement = document.createElement('div');
        popupElement.id = 'comparison-popup';
        popupElement.className = 'comparison-popup';
        
        // Add HTML content
        popupElement.innerHTML = `
            <div class="comparison-popup-header">
                <h2 class="comparison-popup-title" id="comparison-popup-title">Image Comparison</h2>
                <button class="comparison-popup-close" id="comparison-popup-close">×</button>
            </div>
            <div class="comparison-popup-content">
                <div class="comparison-image-container" id="comparison-container">
                    <img class="comparison-image" id="comparison-after" src="" alt="After image">
                    <div class="comparison-before" id="comparison-before-container">
                        <img id="comparison-before" src="" alt="Before image">
                    </div>
                    <div class="comparison-separator" id="comparison-separator"></div>
                    <div class="comparison-handle" id="comparison-handle"></div>
                </div>
            </div>
            <div class="comparison-popup-controls" id="comparison-popup-controls">
                <div class="comparison-quality-control">
                    <label for="comparison-quality-slider">Quality:</label>
                    <input type="range" id="comparison-quality-slider" min="1" max="100" value="80">
                    <input type="number" id="comparison-quality-number" min="1" max="100" value="80">
                </div>
            </div>
        `;
        
        // Add to document body
        document.body.appendChild(popupElement);
        
        // Add CSS if not already included
        if (!document.getElementById('comparison-popup-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'comparison-popup-styles';
            styleElement.textContent = `
                .comparison-popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.85);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }
                
                .comparison-popup.active {
                    opacity: 1;
                    pointer-events: auto;
                }
                
                .comparison-popup-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 900px;
                    padding: 12px;
                    color: #fff;
                }
                
                .comparison-popup-title {
                    font-size: 18px;
                    margin: 0;
                }
                
                .comparison-popup-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #fff;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .comparison-popup-content {
                    position: relative;
                    max-width: 900px;
                    width: 100%;
                    overflow: hidden;
                }
                
                .comparison-image-container {
                    position: relative;
                    width: 100%;
                    background-color: #f0f0f0;
                    overflow: hidden;
                    cursor: ew-resize;
                }
                
                .comparison-image {
                    width: 100%;
                    display: block;
                }
                
                .comparison-before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 50%;
                    overflow: hidden;
                    cursor: ew-resize;
                }
                
                .comparison-before img {
                    position: absolute;
                    display: block;
                    max-width: unset;
                    width: auto;
                    height: 100%;
                }
                
                .comparison-separator {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 50%;
                    width: 2px;
                    background-color: var(--color-primary, #0000ff);
                    transform: translateX(-50%);
                    z-index: 10;
                }
                
                .comparison-handle {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: var(--color-primary, #0000ff);
                    transform: translate(-50%, -50%);
                    cursor: ew-resize;
                    z-index: 11;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3Cpolyline points='12 5 19 12 12 19'%3E%3C/polyline%3E%3Cpolyline points='12 5 5 12 12 19'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: center;
                    transition: transform 0.1s ease, box-shadow 0.1s ease;
                }
                
                .comparison-handle.active,
                .comparison-handle:active {
                    transform: translate(-50%, -50%) scale(1.1);
                    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
                }
                
                .comparison-popup-controls {
                    width: 100%;
                    max-width: 900px;
                    padding: 16px;
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 0 0 4px 4px;
                }
                
                .comparison-quality-control {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    color: #fff;
                }
                
                .comparison-quality-control label {
                    min-width: 60px;
                }
                
                .comparison-quality-control input[type="range"] {
                    flex: 1;
                    height: 8px;
                    -webkit-appearance: none;
                    background: rgba(255, 255, 255, 0.2);
                    outline: none;
                    border-radius: 4px;
                }
                
                .comparison-quality-control input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    background: var(--color-primary, #0000ff);
                    cursor: pointer;
                    border-radius: 50%;
                }
                
                .comparison-quality-control input[type="number"] {
                    width: 60px;
                    padding: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background-color: rgba(0, 0, 0, 0.3);
                    color: #fff;
                    border-radius: 4px;
                    text-align: center;
                }
            `;
            document.head.appendChild(styleElement);
        }
    }

    /**
     * Initialize event listeners for the comparison popup
     */
    function initEventListeners() {
        let isDragging = false;
        
        // Close button
        popupClose.addEventListener('click', close);
        
        // Handle mouse/touch events for the slider
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: true });
        
        // Allow dragging from anywhere in the container
        container.addEventListener('mousedown', function(e) {
            // Only if not clicking on the handle (handle has its own event)
            if (e.target !== handle) {
                // First update position where clicked
                const containerRect = container.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const position = (e.clientX - containerRect.left) / containerWidth;
                const percent = Math.max(0, Math.min(1, position)) * 100;
                
                setComparisonPosition(percent);
                
                // Then start dragging
                startDrag(e);
            }
        });
        
        container.addEventListener('touchstart', function(e) {
            // Only if not touching the handle (handle has its own event)
            if (e.target !== handle) {
                // First update position where touched
                const containerRect = container.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const position = (e.touches[0].clientX - containerRect.left) / containerWidth;
                const percent = Math.max(0, Math.min(1, position)) * 100;
                
                setComparisonPosition(percent);
                
                // Then start dragging
                startDrag(e);
            }
        }, { passive: true });
        
        // Close popup when clicking outside of the popup content
        popup.addEventListener('click', function(e) {
            // Check if the click is directly on the popup background (not on its children)
            // Also don't close if we're dragging
            if (e.target === popup && !isDragging) {
                close();
            }
        });
        
        // Handle escape key to close popup
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                close();
            }
        });
        
        // Quality slider and number input events
        if (qualitySlider && qualityNumber) {
            qualitySlider.addEventListener('input', function() {
                qualityNumber.value = this.value;
            });
            
            qualityNumber.addEventListener('input', function() {
                qualitySlider.value = this.value;
            });
            
            // Handle quality change
            qualitySlider.addEventListener('change', applyQuality);
            qualityNumber.addEventListener('change', applyQuality);
        }
        
        // Function to handle image sizing on popup show and resize
        popup.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'opacity' && popup.classList.contains('active')) {
                // Ensure images resize with the container and match each other
                const containerWidth = container.offsetWidth;
                beforeImg.style.width = containerWidth + 'px';
            }
        });
        
        window.addEventListener('resize', function() {
            if (popup.classList.contains('active')) {
                // Update image sizes on window resize
                const containerWidth = container.offsetWidth;
                beforeImg.style.width = containerWidth + 'px';
            }
        });
        
        // Add a flag to track if we're in the middle of dragging vs just clicking
        let wasDragging = false;
        
        function startDrag(e) {
            isDragging = true;
            wasDragging = false; // Reset this flag when starting a new drag
            if (e.type !== 'touchstart') {
                e.preventDefault();
            }
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: true });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            // Set this flag to true when actual movement happens
            wasDragging = true;
            
            const containerRect = container.getBoundingClientRect();
            const containerWidth = containerRect.width;
            
            // Get position (touch or mouse)
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            // Calculate position relative to container
            let position = (clientX - containerRect.left) / containerWidth;
            
            // Clamp between 0 and 1
            position = Math.max(0, Math.min(1, position));
            
            // Update slider position
            const percent = position * 100;
            setComparisonPosition(percent);
        }
        
        function stopDrag() {
            const wasDraggingFlag = wasDragging;
            isDragging = false;
            wasDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
            
            // Return whether there was actual dragging (useful for other event handlers)
            return wasDraggingFlag;
        }

        // Prevent default touch move actions when dragging (prevent scrolling)
        container.addEventListener('touchmove', function(e) {
            if (isDragging) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // For better mobile experience, add visual feedback when touching
        container.addEventListener('touchstart', function() {
            handle.classList.add('active');
        }, { passive: true });
        
        container.addEventListener('touchend', function() {
            handle.classList.remove('active');
        }, { passive: true });
    }

    /**
     * Set the position of the comparison slider
     * @param {number} percent - Position percentage (0-100)
     */
    function setComparisonPosition(percent) {
        beforeContainer.style.width = `${percent}%`;
        separator.style.left = `${percent}%`;
        handle.style.left = `${percent}%`;
    }

    /**
     * Apply quality settings when changed
     */
    function applyQuality() {
        if (!currentData || !config.onQualityChange) return;
        
        const quality = parseInt(qualitySlider.value);
        config.onQualityChange(quality, currentData);
    }

    /**
     * Open the comparison popup
     * @param {Object} data - Data containing image information
     */
    function open(data) {
        if (!data || !data.beforeSrc || !data.afterSrc) {
            console.error('Missing required image sources');
            return;
        }
        
        currentData = data;
        
        // Set title if provided
        if (data.title) {
            popupTitle.textContent = data.title;
        }
        
        // Set images
        beforeImg.src = data.beforeSrc;
        afterImg.src = data.afterSrc;
        
        // Set quality value if provided
        if (data.quality !== undefined) {
            qualitySlider.value = data.quality;
            qualityNumber.value = data.quality;
        }
        
        // Show popup
        popup.classList.add('active');
        
        // Reset slider position to 50%
        setComparisonPosition(50);
    }

    /**
     * Close the comparison popup
     */
    function close() {
        popup.classList.remove('active');
        currentData = null;
    }

    /**
     * Update the "after" image in the comparison
     * @param {string} newSrc - New source for the after image
     */
    function updateAfterImage(newSrc) {
        if (afterImg && newSrc) {
            afterImg.src = newSrc;
        }
    }

    // Public API
    return {
        init: init,
        open: open,
        close: close,
        updateAfterImage: updateAfterImage
    };
})(); 