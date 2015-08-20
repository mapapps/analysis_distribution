define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "ct/_when",
    "dijit/layout/TabContainer",
    "./ChartingWidget"
], function (declare,
             d_array,
             ct_when,
             TabContainer,
             ChartingWidget) {
    return declare([], {
        _getMetadata: function () {
            var data = [];
            var metadata = this._store.getMetadata();
            ct_when(metadata, function (mdata) {
                var fields = mdata.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].domain) {
                        data.push(fields[i].alias);
                    }
                }
            });
            return data;
        },
        setStore: function (store, props) {
            this._store = store;
        },
        createInstance: function () {
            this.data = this._getMetadata();
            var tabcontainer = this.tabcontainer = new TabContainer();
            var tabs = this.tabs;
            var store = this._store;
            var mapState = this._mapState;
            var props = this._properties;
            var i18n = this._i18n.get();
            var tool = this._tool;
            //var resultCenterDataModel = this._resultCenterDataModel;
            d_array.forEach(this.data || [], function (alias) {
                var tab = new ChartingWidget({
                    props: props,
                    alias: alias,
                    store: store,
                    mapState: mapState,
                    i18n: i18n,
                    tool: tool
                    //resultCenterDataModel: resultCenterDataModel
                });
                if (tab) {
                    tabcontainer.addChild(tab);
                    tab.startup();
                }
            }, this);
            return tabcontainer;
        },
        /*destroyInstance: function (tabcontainer) {
         // tabs are no ComponentFactories, so we have to preserve the widgets from destruction
         d_array.forEach(tabcontainer.getChildren(), function (tab) {
         tabcontainer.removeChild(tab);
         });
         tabcontainer.destroyRecursive();
         },*/
        modified: function () {
            var props = this._properties;
            var storeId = props.storeId;
            var chartType = props.chartType;
            var useExtent = props.useExtent;
            var enableChartSwitch = props.enableChartSwitch;
            var enableExtentSwitch = props.enableExtentSwitch;
            d_array.forEach(this.tabcontainer.getChildren(), function (children) {
                //children.set("_storeId", storeId);
                children.set("_chartType", chartType);
                children.set("_useExtent", useExtent);
                children.set("_enableChartSwitch", enableChartSwitch);
                children.set("_enableExtentSwitch", enableExtentSwitch);
                children._onNewProperties();
            }, this);
        },
        _onWindowOpen: function (event) {
            debugger;
        }
    });
});
		