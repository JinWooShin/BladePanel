/**
 * Created by jwshin on 12/10/2014.
 */
(function () {
    'use strict';
    angular.module('app')

    .provider('PanelProvider', [function () {
        var panels = [];
        var getPanel = function (id) {
            return panels.filter(function (_panel) {
                return _panel.id === id;
            });
        };
        var createPanel = function (type) {
            var panel = {};
            switch (type) {
                case "map":
                    panel = {
                        content: {
                            title: "Map",
                            content: "Map goes here"
                        }
                    };
                    break;
                case "search":
                    panel = {
                        content: {
                            title: "Search",
                            content: "Filter goes here"
                        }
                    };
                    break;
                case "project":
                    panel = {
                        content: {
                            title: "Project",
                            content: "Filter goes here"
                        }
                    };
                    break;
                default:
                    panel = {
                        content: {
                            title: type,
                            content: "Whatever goes here"
                        }
                    };
                    break;
            }
            panel.id = "panel-" + panel.content.title;
            panel.parent = "root";
            panel.children = [];
            panel.lock = false;
            panel.collapse = false;
            return panel;
        };


        this.panelsConfig = {};
        this.$get = function ($rootScope, $log, $templateCache) {
            var ret = {
                clear: function () {
                    panels = [];
                },
                getPanel: function (type) {
                    var panel = angular.copy(ret.panelConfigs.panels[type]);
                    panel.id = "panel-" + panel.content.title;
                    panel.parent = "root";
                    panel.children = [];
                    panel.lock = false;
                    panel.collapse = false;
                    return panel;
                },
                addPanel: function (type) {
                    //var panel = ret.getPanel(type);
                    var panel = createPanel(type);
                    panel.templateUrl = "panel-" + type + ".html";
                    panels.push(panel);
                    $rootScope.$broadcast("panelChanged", panels);
                },
                removePanel: function (panel) {
                    var matchPanel = panels.filter(function (_panel) {
                        return _panel.$$hashKey === panel.$$hashKey;
                    });
                    if (matchPanel.length > 0) {
                        $log.debug("Removing panel: " + panel.content.title);
                        panels.splice(panels.indexOf(matchPanel[0]), 1);
                        $rootScope.$broadcast("panelChanged", panels);
                    } else {
                        $log.error("Cannot found panel to remove");
                    }
                },
                openChildPanel: function (parentPanel, childPanel) {
                    parentPanel.children.push(childPanel.id);
                    childPanel.parent = parentPanel.id;
                    childPanel.id = parentPanel.id + childPanel.content.title;
                    panels.splice(panels.indexOf(parentPanel) + 1, 0, childPanel);
                    $rootScope.$broadcast("panelChanged", panels);
                },
                closePanel: function (panel) {
                    if (panel.children.length > 0) {
                        angular.forEach(panel.children, function (child) {
                            var childPanel = getPanel(child.id);
                            ret.closePanel(childPanel);
                        });
                    } else {
                        var parent = getPanel(panel.parent);
                        parent.children.splice(parent.children.indexOf(panel.id), 1);    //remove child id from parent
                        if (panel.lock) {
                            if (panel.parent !== "root") {
                                var parentParent = getPanel(parent.parent);
                                panel.parent = parentParent.id; //connect panel with panel's grandparent
                            }
                        } else {
                            var matchedPanel = panels.filter(function (_panel) {
                                return panel.id === _panel.id;
                            });
                            if (matchedPanel.length > 0) {
                                $log.debug("Remove panel: " + panel.content.title);
                                panels.splice(panels.indexOf(matchedPanel[0]), 1);  //remove panel
                            } else {
                                $log.error("Cannot found panel to be deleted");
                            }
                        }
                    }
                },

                savePanel: function (panel) {
                    $log.debug("Save panel: " + panel.content.title);
                },
                saveAllPanels: function () {
                },
                restorePanels: function (_panels) {
                    panels = _panels;
                },
                getPanels: function () {
                    return panels;
                },
                panelConfigs: this.panelsConfig
            };
            return ret;
        }
    }]);
}).call(this);