const TOOL_PRESETS = {
    tools: [
        // {
        //     name: "Tool Template",
        //     icon: "fa-file-code",
        //     description: "Template for creating new tools",
        //     url: "tools/tool-template.html",
        //     category: "Template",
        //     tags: ["template", "tool", "create", "new", "toolity"],
        //     isLocked: false,
        //     isNew: false
        // },
        {
            name: "PNG to JPG",
            icon: "fa-file-image",
            description: "Transform PNG images to JPG format while maintaining image quality",
            url: "tools/png-to-jpg.html",
            category: "Image",
            tags: ["image", "convert", "png", "jpg", "format", "photo", "picture", "transform"],
            isLocked: false,
            isNew: false
        },
        {
            name: "JPG to PNG",
            icon: "fa-file-image",
            description: "Convert JPG images to PNG format with transparency support",
            url: "tools/jpg-to-png.html",
            category: "Image",
            tags: ["image", "convert", "jpg", "png", "format", "photo", "picture", "transform"],
            isLocked: false,
            isNew: false
        },
        {
            name: "PDF to Word",
            icon: "fa-file-pdf",
            description: "Convert PDF documents to editable Word files while preserving formatting and layout",
            url: "tools/pdf-to-word.html",
            category: "Document",
            tags: ["pdf", "word", "convert", "document", "edit", "format", "text"],
            isLocked: true,
            isNew: false
        },
        {
            name: "Word to PDF",
            icon: "fa-file-word",
            description: "Transform Word documents into professional PDF files with perfect formatting",
            url: "tools/word-to-pdf.html",
            category: "Document",
            tags: ["word", "pdf", "convert", "document", "format", "text"],
            isLocked: true,
            isNew: false
        },
        {
            name: "PDF to JPG",
            icon: "fa-file-pdf",
            description: "Extract high-quality images from PDF documents with precise control",
            url: "tools/pdf-to-jpg.html",
            category: "Image",
            tags: ["pdf", "jpg", "convert", "image", "extract", "photo"],
            isLocked: true,
            isNew: false
        },
        {
            name: "JPG to PDF",
            icon: "fa-file-image",
            description: "Convert JPG images into professional PDF documents with customizable settings",
            url: "tools/jpg-to-pdf.html",
            category: "Document",
            tags: ["jpg", "pdf", "convert", "image", "document", "photo"],
            isLocked: true,
            isNew: false
        },
        {
            name: "Image to Base64",
            icon: "fa-code",
            description: "Convert images to Base64 encoded strings for web applications",
            url: "tools/image-to-base64.html",
            category: "Code",
            tags: ["image", "base64", "convert", "code", "web", "encode"],
            isLocked: true,
            isNew: false
        },
        {
            name: "Base64 to Image",
            icon: "fa-code",
            description: "Transform Base64 encoded strings back into image files",
            url: "tools/base64-to-image.html",
            category: "Code",
            tags: ["base64", "image", "convert", "code", "web", "decode"],
            isLocked: true,
            isNew: false
        },
        {
            name: "JSON to CSV",
            icon: "fa-file-code",
            description: "Convert JSON data into CSV format for spreadsheet applications",
            url: "tools/json-to-csv.html",
            category: "Data",
            tags: ["json", "csv", "convert", "data", "spreadsheet", "format"],
            isLocked: true,
            isNew: false
        },
        {
            name: "CSV to JSON",
            icon: "fa-file-csv",
            description: "Transform CSV files into structured JSON data format",
            url: "tools/csv-to-json.html",
            category: "Data",
            tags: ["csv", "json", "convert", "data", "spreadsheet", "format"],
            isLocked: true,
            isNew: false
        }
    ]
}; 