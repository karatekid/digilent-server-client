define(['lib/text!./SetInput-component.html'], function(htmlString) {
    function SetInputVM(params) {
        var self = this;
        self.roptions = (params && params.data && params.data.options) || 0;
        self.val = (params && params.data && params.data.val) || 0;
        self.dict = (params && params.dict) || 0;
        self.name = (params && params.name) || 0;
    }
    return {viewModel: SetInputVM, template: htmlString};
});
