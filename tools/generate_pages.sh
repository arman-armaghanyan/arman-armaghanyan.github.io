#!/bin/bash

# Create each tool page
tools=(
    "PDF to Word:pdf-to-word"
    "Word to PDF:word-to-pdf"
    "PDF to JPG:pdf-to-jpg"
    "JPG to PDF:jpg-to-pdf"
    "PNG to JPG:png-to-jpg"
    "JPG to PNG:jpg-to-png"
    "Image to Base64:image-to-base64"
    "Base64 to Image:base64-to-image"
    "JSON to CSV:json-to-csv"
    "CSV to JSON:csv-to-json"
    "XML to JSON:xml-to-json"
    "JSON to XML:json-to-xml"
    "Markdown to HTML:markdown-to-html"
    "HTML to Markdown:html-to-markdown"
    "Excel to CSV:excel-to-csv"
    "CSV to Excel:csv-to-excel"
    "Text to Speech:text-to-speech"
    "Speech to Text:speech-to-text"
    "EPUB to PDF:epub-to-pdf"
    "PDF to EPUB:pdf-to-epub"
    "DOCX to TXT:docx-to-txt"
    "TXT to DOCX:txt-to-docx"
    "PowerPoint to PDF:powerpoint-to-pdf"
    "PDF to PowerPoint:pdf-to-powerpoint"
    "ZIP to RAR:zip-to-rar"
    "RAR to ZIP:rar-to-zip"
    "WebP to JPG:webp-to-jpg"
    "JPG to WebP:jpg-to-webp"
    "ICO to PNG:ico-to-png"
    "PNG to ICO:png-to-ico"
    "Video to MP3:video-to-mp3"
    "MP3 to WAV:mp3-to-wav"
    "WAV to MP3:wav-to-mp3"
)

# Create each tool page
for tool in "${tools[@]}"; do
    tool_name="${tool%:*}"
    filename="${tool#*:}.html"
    cat template.html | sed "s/Tool Name/$tool_name/g" > "$filename"
done 