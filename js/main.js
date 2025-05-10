document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    
    // Clear existing tools (except website name)
    const websiteName = grid.querySelector('.website-name');
    grid.innerHTML = '';
    if (websiteName) {
        grid.appendChild(websiteName);
    }

    // Generate tool tiles
    TOOL_PRESETS.tools.forEach(tool => {
        const toolTile = createToolTile(tool);
        grid.appendChild(toolTile);
    });
});

function createToolTile(tool) {
    // Use div for locked tools, anchor for unlocked tools
    const tile = document.createElement(tool.isLocked ? 'div' : 'a');
    
    if (!tool.isLocked) {
        tile.href = tool.url;
    }
    
    tile.className = 'tile tool';
    
    if (tool.isLocked) {
        tile.setAttribute('locked', '');
    }
    
    if (tool.isNew) {
        tile.setAttribute('new', '');
    }

    tile.innerHTML = `
        <i class="fas ${tool.icon} tool-icon"></i>
        <h2>${tool.name}</h2>
        <p>${tool.description}</p>
        ${tool.isNew ? '<span class="new-badge">New</span>' : ''}
    `;

    return tile;
} 