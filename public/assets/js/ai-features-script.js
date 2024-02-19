document.addEventListener('DOMContentLoaded', function() {

    // function to clear note AI features content
    const clearAIFeaturesBtn = document.getElementById('clear-ai-features-btn');
    clearAIFeaturesBtn.addEventListener('click', function() {
        // Clears content of AI features editor
        quillAIFeatures.setContents([]);
    });

});