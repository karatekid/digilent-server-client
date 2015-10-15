define(['lib/text!./CRTextInput-component.html'], function(htmlString) {
    function CRTextInputVM(params) {
        var self  = this;
        self.min  = (params && params.data && params.data.min) || 0;
        self.max  = (params && params.data && params.data.max) || 0;
        self.val  = (params && params.data && params.data.val) || 0;
        self.name = (params && params.name) || 0;
    }
    return {viewModel: CRTextInputVM, template: htmlString};
});
