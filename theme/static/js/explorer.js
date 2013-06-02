function performSearch() {
    var queryElement = document.getElementById('searchString');
    var query = queryElement.value;

    $.getJSON('http://api.bukget.org/3/search/plugin_name/like/' + query, onSuccessfulDataLoad);
}

function onSuccessfulDataLoad(data) {
    w2ui['plugin_listing'].clear();

    var items = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        dataItem.recid = i;

        items.push(dataItem);
    };

    w2ui['plugin_listing'].add(items);
}

function createColumnArray(columnList) {
    var columnArray = [];
    for (var i = 0; i < columnList.length; i++) {
        var columnName = columnList[i];
        var columnObject = {
            field   : columnName,
            caption : columnName,
            size    : 200
        };

        columnArray.push(columnObject);
    }

    return columnArray;
}

function createGrid(type, columnList) {
    $('#explorerMain').w2grid({
        name    : type,
        header  : type,
        columns : createColumnArray(columnList),
        show    : {
            footer  : true
        }
    });

    w2ui['layout'].content('main', w2ui[type]);
}

function startExplorer() {
    w2utils.settings.RESTfull = true;

    // Create the general Layout.
    $('#explorerLayout').w2layout({
        name: 'layout',
        panels: [
            { type: 'left', size: 200, resizable: true, content: '' },
            { type: 'main', content: '<table id="wrapper"><tr><td><img src="/images/loading2.gif" alt="" /></td></tr></table>' },
            { type: 'right', size: 200, resizable: true, content: '', hidden: true }
        ]
    });

    // Create the Sidebar UI.
    $('#explorerSidebar').w2sidebar({
        name: 'sidebar',
        img: null,
        topHTML:    '<input style="width: 135px; margin-left:5px; margin-top:5px; margin-bottom:5px;" type="text" id="searchString" /> ' +
                    '<input style="width: 50px; margin-top:5px; margin-bottom:5px;" type="button" value="Search" class="input" id="searchBtn" onclick="performSearch();" />',
        nodes: [
            { id: 'level-1', text: 'Plugin Listing', img: 'icon-page', selected: true},
            { id: 'level-2', text: 'Trending API', img: 'icon-page'},
            { id: 'level-3', text: 'Trending Plugin', img: 'icon-page'}
        ]
    });

    // Add Sidebar to the Left Panel.
    w2ui['layout'].content('left', w2ui['sidebar']);

    // Create Plugin Listing Grid.
    createGrid('plugin_listing', ['plugin_name', 'slug', 'description']);

    // Load Initial Data.
    $.getJSON('http://api.bukget.org/3/plugins/', onSuccessfulDataLoad);

    w2ui['plugin_listing'].on('select', function(target, eventData) {
        var recordIndex = eventData.recid;
        var record = w2ui['plugin_listing'].get(index);

        var indexArray = w2ui['plugin_listing'].getSelection();
        if (!indexArray) {
            return;
        }
        var index = indexArray[0];
        if (!index) {
            return;
        }
        var record = w2ui['plugin_listing'].get(index);
        if (!record) {
            return;
        }

        var url = 'http://api.bukget.org/3/plugins/bukkit/ ' + record.slug + '?start=0&size=25&fields=versions.type,versions.version';
        $.getJSON(url, function(data) {
            console.log(data);
        });
    });
};


function openExplorer() {
    $().w2popup('open', { 
        body: '<div id="explorerLayout"></div><div id="explorerMain"></div><div id="explorerSidebar"></div>',
        onOpen: startExplorer(),
        title: 'BukGet Explorer',
        width: 1024, 
        height: 600, 
        modal: true, 
        showClose: true, 
        showMax: true, 
        speed: '0.5',
        opacity: '0.5'
    });
}