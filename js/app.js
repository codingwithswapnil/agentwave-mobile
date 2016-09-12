'use strict';

/* beginning functions*/
function prepareCASLPage() {
  try {
    document.getElementById('log-link').click();
    document.getElementById('marketing-btn').click();
    var event = new Event('change');
    document.getElementsByClassName('select-consent')[0].dispatchEvent(event);
      fillHistoryPane();
      var tagboxes = document.getElementsByClassName('casl__tag-box');
      for (var i = 0; i < tagboxes.length; i++) {
        var input = tagboxes[i].getElementsByTagName('input')[0];
        input.onblur = function() {
          setTimeout(function(){
            this.value = '';
            this.parentNode.nextElementSibling.style.display = 'none';
          }.bind(this), 10);
        };
      }
  } catch(e) {
    console.log(e);
  }
}
function setClickableBlocksListener() {
  try {
    var elems = document.getElementsByClassName('new-client__clickable-block');
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener('click', onBlockCheck, false);
    }
    document.getElementById('special-features-btn').click();
  } catch(e) {
    console.log('setClickableBlocksListener', e);
  }

}

function prepareNewClientPage() {
  try {
    document.getElementById('general-link').click();
  } catch(e) {
    console.log('prepareNewClientPage', e);
  }
}

function preparePopupTodoPage() {
  document.documentElement.addEventListener('click', onShowTodoPopup);
}


function onShowTodoPopup(){
    document.getElementsByClassName('popup-todo')[0].style.display = 'block';
    document.getElementById('important').style.display = 'block';
    if (document.getElementById('recurred-todo').checked)
        document.getElementById('recurred-todo').click();
    document.documentElement.removeEventListener('click', onShowTodoPopup);
}

/*main info structure, common for all pages*/
var info = {
    'info':[
        {
            'Id': 1,
            'Name': 'Trevor Seib',
            'Address': '34 th avenue Marie St, CA',
            'e-mail': 'trevor@gmail.com',
            'Category': 'No category',
            'Post address': 'L9T 7N9/Bungalow',
            'Type': 'message',
            'Transaction info': 'Asking: $ 500,000'
        },
        {
            'Id': 2,
            'Name': 'Adeline Emily',
            'Phone number': '955-044-8240',
            'Address': '24 SouthCentral Park',
            'e-mail': 'a_emily@gmail.com',
            'Post address': 'L9T 7N9/New York',
            'Type': 'call',
            'Transaction info': 'Asking: $ 1500,000'
        },
        {
            'Id': 3,
            'Name': 'Evangeline Pieters',
            'Phone number': '955-044-8240',
            'Address': '26 Great Mansions St',
            'e-mail': 'e_pieters@gmail.com',
            'Category': 'Actively Showing',
            'Post address': 'L9T 7N9/Los Alamos',
            'Type': 'message',
            'Transaction info': 'Asking: $ 15,000'
        },
        {
            'Id': 4,
            'Name': 'Matthew Sylvain Lanneister',
            'Phone number': '905-815-5503',
            'Address': '22th West Bromwich St, Hamilton, Ontario',
            'e-mail': 'lanneister@gmail.com',
            'Category': 'Actively Showing',
            'Post address': '',
            'Type': 'call',
            'Transaction info': 'Asking: $ 10,000'
        }
    ]
};

/*common functions*/
function selectCategory(evt) {
    var categories = document.getElementsByClassName("category");
    for (var i = 0; i < categories.length; i++) {
        categories[i].className = categories[i].className.replace(" selected", "");
    }
    evt.currentTarget.className += " selected";
    var images = evt.currentTarget.parentNode.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        images[i].src = images[i].src.replace('-active.png','.png');
    }
    var image = evt.currentTarget.getElementsByTagName('img')[0];
    image.src = image.src.replace('.png', '-active.png');
}

function controlPaneVisibility(btn, pane) {
  var img = btn.getElementsByTagName('span')[0];
  var text = btn.getElementsByTagName('div')[0];
  if (pane.style.display == 'none') {
    pane.style.display = 'block';
    text.innerText = text.innerText.replace('Show', 'Hide');
    img.className = img.className.replace('show', 'hide');
  } else {
    img.className = img.className.replace('hide', 'show');
    text.innerText = text.innerText.replace('Hide', 'Show');
    pane.style.display = 'none';
  }
}

function commonOpenTab(evt, classPrefix, callback) {
    if (classPrefix == undefined){
        classPrefix = '';
    }
    var i, tabcontent, tablinks;
    var paneId = evt.currentTarget.id.split('-')[0];
    tabcontent = document.getElementsByClassName(classPrefix + "tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName(classPrefix + "tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    if (callback != undefined) {
      callback(evt, paneId);
    } else {
      evt.currentTarget.className += " active";
      if (document.getElementById(paneId) != undefined)
        document.getElementById(paneId).style.display = "block";
    }
}

function finding(inputValue, selectValue) {
    if (inputValue == '' || selectValue == '')
        return [];
    var result = [];
    for (var i = 0; i < info['info'].length; i++) {
        if (info['info'][i][selectValue] == undefined)
            continue;
        if (info['info'][i][selectValue].toLowerCase().indexOf(inputValue.toLowerCase()) != -1)
            result.push(info['info'][i]);
    }
    return result;
}



/*special functions*/

/*special new-client js code*/
function onBlockCheck(evt) {
  if (evt.target.className.indexOf('checked') != -1) {
    evt.target.className = evt.target.className.replace(' checked', '');
  } else {
    evt.target.className += ' checked';
  }
}


function changeProvinceLabel(value) {
  if (value == 'USA') {
    document.getElementById('state-province_label').innerText = 'State';
  } else {
    document.getElementById('state-province_label').innerText = 'Province';
  }
}

/*special popup-todo code*/


function openOrangeTab(evt, paneId) {

    if (evt.currentTarget.checked) {
      var node = evt.currentTarget;
      while (node.className.indexOf("tablinks") == -1 || node.tagName == 'UL') {
          node = node.parentNode;
      }
      if (document.getElementById(paneId) != undefined)
        document.getElementById(paneId).style.display = "block";
      node.className += " active";
  }
    else {
        document.getElementById('important').style.display = "block";
        //evt.currentTarget.parentNode.className += " active";
    }
}


function attachClientById(evt) {
    var attachPane = $(evt.target).closest('.popup-todo__tabcontent').find('.attached-clients')[0];
    var clientId = parseInt(evt.target.id.replace('person', ''));

    if (isNaN(clientId))
        return;

    for (var i = 0; i < info['info'].length; i++) {
        if (info['info'][i]['Id'] == clientId) {
            makeAttachedElem(attachPane, info['info'][i]);
            $(event.target).closest('.popup-todo__tabcontent').find('input')[0].value = '';
        }
    }
}


function makeAttachedElem(parent, item) {
    var attItem = document.createElement('div');
    attItem.className = "attached-item";
    parent.appendChild(attItem);
    var nameElem = document.createElement('div');
    nameElem.className = "result-name-text";
    nameElem.innerHTML = item['Name'];
    attItem.appendChild(nameElem);
    var address = document.createElement('div');
    address.className = "result-address-text";
    if (item['Address'])
      address.innerHTML= item['Address'];
    else
      address.innerHTML = 'No info';    
    attItem.appendChild(address);
    var otherinfoElem = document.createElement('div');
    otherinfoElem.className = "result-other-info-text";
    var str = '<div>';
    if (item['e-mail'])
      str += item['e-mail'];
    else
      str += 'No info';

    str += '</div><div>';
    if (item['Phone number'])
      str += item['Phone number'];
    else
      str += 'No info';
    str += '</div>';
    otherinfoElem.innerHTML = str;
    //otherinfoElem.innerHTML = item['e-mail'] + ' ' + item['Phone number'];
    attItem.appendChild(otherinfoElem);
}

function startFindForPopupTodo(inputValue, resultPane, event) {
    var elems = document.getElementsByClassName('popup-todo__search-result');
    while (resultPane.children.length > 0) {
        resultPane.removeChild(resultPane.children[0]);
    }
    var result = finding(inputValue, 'Name');
    if (result.length == 0) {
        resultPane.style.display = 'none';
        if (event.keyCode == 13 && inputValue != '') {
          var attachPane = $(event.target).closest('.popup-todo__tabcontent').find('.attached-clients')[0];
          makeAttachedElem(attachPane, {'Name' : inputValue});
          event.target.value = '';
        } 
    } else {
        resultPane.style.display = 'block';
    }
    for (var i = 0; i < result.length; i++) {
        var person = document.createElement('div');
        person.className = "popup-todo__search-result";
        person.innerHTML = result[i]['Name'];
        person.id = 'person' + result[i]['Id'];
        person.addEventListener('click', attachClientById, false);
        resultPane.appendChild(person);
    }/**/
}




/*special CASL js code*/


function showQuestions(elem) {
  elem.style.display = 'none';
  elem.nextElementSibling.className += ' flex-block';
}
function hideQuestions(elem) {
  elem.style.display = 'none';
  elem.className = elem.className.replace(' flex-block', '');
  elem.previousElementSibling.style.display = 'block';
}

function removeParent(evt) {
  try {
    evt.target.parentNode.remove();
  } catch (e) {
    console.log(e);
  }
}
function findKeywords(event, value, resultPane) {
  if (event.keyCode) {
    if ([38, 40, 13].indexOf(event.keyCode) != -1 && resultPane.style.display != 'none' ) {
      findByKeys(event.keyCode, resultPane);
      return;
    }
  }
  var keywords = ['Married', 'Works on small comp', 'Interested in condos', 'Sample Follow up Plan',
  'Mail List', 'Sample Email List Name', 'Sample Email List'];

    var elems = document.getElementsByClassName('tag__search-result');
    while (elems.length > 0) {
        elems[0].remove();
    }
    var result = [];
    for (var i = 0; i < keywords.length; i++) {
      if (keywords[i].toLowerCase().indexOf(value.toLowerCase()) != -1)
        result.push(keywords[i]);
    }
    if (resultPane.className.indexOf('result') == -1) {
      console.log('error!cannot find place for tag results!')
      return;
    }
    var panes = document.getElementsByClassName(resultPane.className);
    for (var i = 0; i < panes.length; i++) {
      panes[i].style.display = 'none';
    }

    if (result.length <= 0 || value == '') {
      return;
    }
    resultPane.style.display = 'block';
    for (var i = 0; i < Math.min(result.length, 3); i++) {
        var kwd = document.createElement('div');
        kwd.className = "tag__search-result";
        if (i == 0) {
          kwd.className += " selected";
        }
        kwd.innerHTML = result[i];
        kwd.addEventListener('click', addKeyword, false);
        resultPane.appendChild(kwd);
    }/**/
}


function addKeyword(evt) {
  evt.target.parentNode.style.display = 'block';
  var lastSelectedEl = evt.target.parentNode.getElementsByClassName('selected')[0];
  lastSelectedEl.className = lastSelectedEl.className.replace(' selected', '');
  evt.target.className += " selected";
    var attachPane = evt.target.parentNode.previousElementSibling;
    if (attachPane.className.indexOf('tag-box') == -1) {
      console.log('error!cannot find place for tag!')
      return;
    }
    var input = attachPane.getElementsByTagName('input')[0];
    var attItem = document.createElement('span');
    attItem.className = "casl__tag";
    attItem.innerText = evt.target.innerText;
    var image = document.createElement('img');
    image.className = "del-tag-icon";
    image.src = 'images/del-tag.png';
    image.addEventListener('click', removeParent, false);
    attItem.appendChild(image);
    if (input) {
      attachPane.insertBefore(attItem, input);
      input.blur();
      input.focus();
    } else
      attachPane.appendChild(attItem);
}

function setConsentPane(id) {
    var panes = document.getElementsByClassName("consent-pane");
    for (var i = 0; i < panes.length; i++) {
      panes[i].style.display = 'none';
    }
  if (document.getElementById('pane-' + id) != undefined) {
    document.getElementById('pane-' + id).style.display = 'block';
  }
}

function fillHistoryPane() {
  var history = {
      'info':[
          {
              'src': 'images/h1.jpg',
              'date': '12/8/2015',
              'status': 'Sold',
              'address': '22 Weir St. West Hamilton, Ontario L7T7N8'
          },
          {
              'src': 'images/h3.jpg',
              'date': '12/8/2015',
              'status': 'Bought',
              'address': '34 Westboro St. Milton Town,Ontario L9T7N9'
          },
          {
              'src': 'images/h2.jpg',
              'date': '12/8/2015',
              'status': 'Bought',
              'address': '24 Merlion St. Wilson, Toronto L7T8N8'
          }
      ]
  };
  var parentEl = document.getElementById('history');
  while (parentEl.children.length > 0) {
    parentEl.removeChild(parentEl.children[0]);
  }
  for (var i = 0; i < history['info'].length; i++) {
    var newItem = document.createElement('div');
    newItem.className = 'history-item flex-block ' + history['info'][i]['status'].toLowerCase();
    parentEl.appendChild(newItem);
    /*if (history['info'][i] == 'Sold') {
      newItem.style.borderColor = '#ED1C21';//red
    } else {
      newItem.style.borderColor = '#2FAA01';//green
    }*/
    var image = document.createElement('img');
    image.className = 'history-img';
    image.src = history['info'][i]['src'];
    image.width = 90;
    image.height = 65;
    var text = document.createElement('div');
    text.className = 'history-text no-indent';
    text.innerHTML = history['info'][i]['address'];

    var date = document.createElement('p');
    date.className = "date-status-text";
    date.innerHTML = '<p>' + history['info'][i]['date'] + '</p> <p>' + history['info'][i]['status'] + '</p>';
    text.appendChild(date);
    newItem.appendChild(image);
    newItem.appendChild(text);
  }
}

function showAddPersonPopup() {
  document.getElementById('add-person-popup').style.display = 'block';
  document.getElementsByClassName('black-overlay')[0].style.display = 'block';
}

function hideAddPersonPopup(e) {
  document.getElementById('add-person-popup').style.display = 'none';
  document.getElementsByClassName('black-overlay')[0].style.display = 'none';
  //if you want to save
  if ($(e.target).closest('.casl__button').length || $(e.target).is('.casl__button')) {
    var btn = $('#spouse-partner');
    $('.btn-inner-text').remove();
    var personList = $('.attached-persons .item-header-text');
    if (personList.length <= 3) {
      for (var i = 0; i < personList.length; i++) {
        var pdiv = document.createElement('div');
        pdiv.className = 'btn-inner-text';
        pdiv.innerText = personList[i].innerText;
        btn.append(pdiv);
      }
    } else {
      var pdiv = document.createElement('div');
      pdiv.className = 'btn-inner-text';
      pdiv.innerText = 'Spouse / Partner';
      btn.append(pdiv);
      pdiv = document.createElement('div');
      pdiv.className = 'btn-inner-text';
      pdiv.innerText = 'You attached ' + personList.length + ' persons';
      btn.append(pdiv);

    }
  }
}


function attachPerson(evt) {
  var inp = document.getElementById('search-form');
  var elem = evt.target.parentNode;
  while (elem.className.indexOf('person-item') == -1) {
    elem = elem.parentNode;
  }
  var attachPane = inp.previousElementSibling;
  attachPane.appendChild(elem);
}

function findPersons(value, resultPane) {
  while (resultPane.children.length > 0) {
    resultPane.removeChild(resultPane.children[0]);
  }
  var result = finding(value, 'Name');
  for (var i = 0; i < result.length; i++) {
    var newItem = document.createElement('div');
    newItem.className = 'person-item flex-block';
    switch (i%3){
      case 0:
        newItem.className += ' blue-border';
        break;
      case 1:
        newItem.className += ' orange-border';
        break;
      case 2:
        newItem.className += ' pink-border';
        break;
    }
    resultPane.appendChild(newItem);
    var text = document.createElement('div');
    text.className = 'person-text no-indent';
    text.addEventListener('click', attachPerson, false);
    newItem.appendChild(text);

    var name = document.createElement('div');
    name.className = 'item-header-text';
    name.innerText = result[i]['Name'];
    text.appendChild(name);

    var tmp = document.createElement('div');
    tmp.className = 'item-info-text';
    tmp.innerText = result[i]['Address'];
    text.appendChild(tmp);

    tmp = document.createElement('div');
    tmp.className = 'person-justified-text';
    var str = '<div>';
    if (result[i]['Category'])
      if (result[i]['Category'].toLowerCase().indexOf('no category') == -1)
        str += result[i]['Category'] + '</div> <div>';
      else
        str += '</div> <div>';
    else
      str += '</div> <div>';
    var contact = result[i]['Phone number'] ? result[i]['Phone number'] : result[i]['e-mail']
    if (contact)
      str += contact;
    str += '</div>'
    tmp.innerHTML = str;
    text.appendChild(tmp);
      var image = document.createElement('img');
      image.className = "del-person-icon";
      image.src = 'images/del-tag.png';
      image.addEventListener('click', removeParent, false);

    newItem.appendChild(image);
  }

}

function showItem(className) {
  var search = document.getElementsByClassName(className);
  search[0].className += " " + className + "--is-visible";
  document.getElementsByClassName('cover')[0].className += " cover--is-visible";
}

/* search-bar js*/
function startFind(inputValue, selectValue) {
    var tab = '';
    var tablinks = document.getElementsByClassName("searchbar__tablinks");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].className.indexOf("active") != -1) {
            tab = tablinks[i].id.split('-')[0];
        }
    }
    var resultPane = document.getElementById(tab + '-results');
    var elems = document.getElementsByClassName('searchbar__search-result');
    while (elems.length > 0) {
        elems[0].parentNode.removeChild(elems[0]);
    }
    var result = finding(inputValue, selectValue);
    for (var i = 0; i < result.length; i++) {
        makeResultElem(tab, resultPane, result[i]);
    }
}
function openClient() {
    try {
        document.getElementById('client-link').click();
    } catch(e) {
        console.log('error! cannot open client tab in searchbar!', e);
    }
}

function makeResultElem(tab, parent, item) {
    //create div for item. it'll have rounded border
    var newElem = document.createElement('div');
    newElem.className = "searchbar__search-result";
    parent.appendChild(newElem);
    // create table
    var table = document.createElement('table');
    newElem.appendChild(table);
    var tr = document.createElement('tr');
    table.appendChild(tr);
    if (tab == 'client'){
        //add svg
        var td1 = document.createElement('td');
        tr.appendChild(td1);
        var svgElem = document.createElement('div');
        svgElem.className = "svg-container";
        var svgHtml = '<svg width="40" height="25"><use x="0" y="0"  width="40" height="25" xlink:href="';
        switch (item['Type']) {
            case 'message':
                svgHtml += '#mail-icon';
                break;
            case 'call':
                svgHtml += '#phone-icon1';
                break;
        }
        svgHtml += '" /></use></svg>'
        svgElem.innerHTML = svgHtml;
        td1.appendChild(svgElem);
        //add info
        var td2 = document.createElement('td');
        tr.appendChild(td2);
        var nameElem = document.createElement('div');
        nameElem.className = "searchbar__result-name-text";
        nameElem.innerHTML = item['Name'];
        td2.appendChild(nameElem);
        var otherinfoElem = document.createElement('div');
        otherinfoElem.className = "searchbar__result-other-info-text";
        var str = '';
        str = addInfoInString(str, item['Phone number']);
        str += '<br>';
        str = addInfoInString(str, item['Address']);
        otherinfoElem.innerHTML = str;//item['Phone number'] + '<br>' + item['Address'];
        td2.appendChild(otherinfoElem);
    } else {
        var td2 = document.createElement('td');
        tr.appendChild(td2);
        var nameElem = document.createElement('div');
        nameElem.className = "searchbar__result-name-text";
        nameElem.innerHTML = item['Name'];
        td2.appendChild(nameElem);
        var otherinfoElem = document.createElement('div');
        otherinfoElem.className = "searchbar__result-other-info-text";
        var str = '';

        str = addInfoInString(str, item['Address']);
        str += '<br>';
        str = addInfoInString(str, item['Post address']);
        otherinfoElem.innerHTML = str;//item['Address'] + '<br>' + item['Post address'];
        td2.appendChild(otherinfoElem);
        var nameElem = document.createElement('div');
        nameElem.className = "searchbar__transaction-info-text";
        nameElem.innerHTML = addInfoInString('', item['Transaction info']);
        //nameElem.innerHTML = item['Transaction info'];
        td2.appendChild(nameElem);
    }
}

function addInfoInString(str, info) {
    try {
        if (info && info != '')
            str += info;
        else
            str += 'No info';

    } catch(e) {
        str += 'No info';
    }
    return str;
}


function onChangeSearchbarTab(event, prefix) {
    commonOpenTab(event, prefix);
    startFind(document.getElementById('search-input').value, document.getElementById('my-search-select').value);
}
function findByKeys(key, resultPane) {
  var selectedItem = resultPane.getElementsByClassName('selected')[0];
  switch (key) {
    case 38:
      if (selectedItem.previousElementSibling) {
        selectedItem.previousElementSibling.className += ' selected';
      } else {
        selectedItem.parentNode.lastElementChild.className += ' selected';
      }
      selectedItem.className = selectedItem.className.replace(' selected', '');
      break;
    case 40:
      if (selectedItem.nextElementSibling) {
        selectedItem.nextElementSibling.className += ' selected';
      } else {
        selectedItem.parentNode.firstElementChild.className += ' selected';
      }
      selectedItem.className = selectedItem.className.replace(' selected', '');
      break;
    case 13:
      selectedItem.click();
      break;
  }

}

function tagSearch(event, value) {
  if (event.keyCode) {
    if ([38, 40, 13].indexOf(event.keyCode) != -1 && $(".tags-area")[0].style.display != 'none' ) {
      findByKeys(event.keyCode, $(".tags-area")[0]);
      return;
    }
  }
  var tags = ['sample 1',  'sample 2', 'Bungalow', 'Married', 'Works on small comp', 'Interested in condos', 'Sample Follow up Plan',
  'Mail List', 'Sample Email List Name', 'Sample Email List'];
  $(".tags-area span").remove();
  value = value.toLowerCase();
  if (value.length > 0) {
    var counter = 0;
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].toLowerCase().indexOf(value) != -1){
        var tmp = document.createElement('span');
        tmp.innerText = tags[i];
        if (counter == 0) {
          tmp.className += " selected";
        }
        counter++;
        tmp.addEventListener('click', function() {
          $('#tags-search-input')[0].value = this.innerText;
          $(".tags-area").hide();
        }, false);
        $(".tags-area").append(tmp);
        if (counter >= 2) 
          break;
      }
    }
    if (counter > 0)
      $(".tags-area").show();
    else
      $(".tags-area").hide();
  }
  else
    $(".tags-area").hide();
}



function createClientItem(listElem, index) {
    if (clientsListInfo['info'][index] == undefined)
      return -1;
    var currentInfo = clientsListInfo['info'][index];
    var newItem = document.createElement('div');
    newItem.className = 'cmncting__client ';
    switch (index%3){
      case 0:
        newItem.className += ' blue-border';
        break;
      case 1:
        newItem.className += ' orange-border';
        break;
      case 2:
        newItem.className += ' pink-border';
        break;
    }
    var listitem = document.createElement('li');
    listitem.appendChild(newItem);
    listElem.append(listitem);
    var text = document.createElement('a');
    text.className = 'cmncting__client__info';
    newItem.appendChild(text);
    text.addEventListener('click', onEditDeleteClientClick);
    var tmp = document.createElement('span');
    tmp.innerText = currentInfo['Name'];
    text.appendChild(tmp);
    tmp = document.createElement('p');
    tmp.innerText = currentInfo['Address'];
    text.appendChild(tmp);
    var details = document.createElement('div');
    details.className = 'cmncting__client__details';
    tmp = document.createElement('span');
    tmp.innerText = currentInfo['Category'];
    details.appendChild(tmp);
    tmp = document.createElement('span');
    tmp.innerText = currentInfo['Phone'];
    details.appendChild(tmp);
    text.appendChild(details);
    text = document.createElement('div');
    text.className = 'cmncting__client__link';
    var arrow = document.createElement('a');
    arrow.className = 'js-edit-delete';
    arrow.innerHTML = '<i class="icon icon--more"></i>';
    //arrow.addEventListener('click', onEditDeleteClientClick);
    text.appendChild(arrow);
    newItem.appendChild(text);
}


function createLogItem(listElem, index) {
    if (logInfo['info'][index] == undefined)
      return -1;
    var currentInfo = logInfo['info'][index];
    var newItem = document.createElement('div');
    newItem.className = 'log-item ';
    switch (index%3){
      case 0:
        newItem.className += ' blue-border';
        break;
      case 1:
        newItem.className += ' orange-border';
        break;
      case 2:
        newItem.className += ' pink-border';
        break;
    }
    var listitem = document.createElement('li');
    listitem.appendChild(newItem);
    listElem.append(listitem);
    var text = document.createElement('div');
    text.className = 'item-header-text';
    text.innerText = currentInfo['Type'];
    newItem.appendChild(text);

    switch (currentInfo['Type']){
      case 0:
        text.innerText = 'Phone Call';
        newItem.appendChild(text);
        break;
      case 1:
        text.innerText = 'Email';
        newItem.appendChild(text);
        text = document.createElement('div');
        text.className = 'item-subject-text';
        text.innerText = 'Subject: ' + (currentInfo['Subject'] ? currentInfo['Subject'] : '');
        newItem.appendChild(text);
        break;
    }

    text = document.createElement('div');
    text.className = 'item-info-text';
    text.innerText = currentInfo['Description'];
    newItem.appendChild(text);

    text = document.createElement('div');
    text.className = 'item-date-person-text';
    var str = '<p>';
    if (currentInfo['Date'])
      str += currentInfo['Date'] + '</div> <div>';
    else
      str += '</p> <p>';
    var contact = currentInfo['Person']
    if (contact)
      str += contact;
    str += '</p>'
    text.innerHTML = str;
    newItem.appendChild(text);
}

function deleteClientPopupHide() {
  $('.black-overlay').fadeOut();
  $('.delete-person-popup').fadeOut();
  $('.black-overlay').off('click');
  $('.delete-person-popup__btn').off('click');
}
function onCmnctingOpen() {
  $('[data-tab="cmncting"]').click();
}


function setInfiniteScrollListeners(scrollSelector, itemsCount, callback) {
    $(scrollSelector).bind('scroll', function() {
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
        infiniteScrollItems(scrollSelector, itemsCount, callback);
      }
    });
    $(window).bind('scroll', function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        infiniteScrollItems(scrollSelector, itemsCount, callback);
      }
    });
    $(scrollSelector).scroll();
}

function infiniteScrollItems(scrollSelector, itemsCount, callback){
    var offset = $(scrollSelector + ' li').length;
    for (var i = offset; i < Math.min(offset + itemsCount, logInfo['info'].length); i++) {
      callback($(scrollSelector), i);
    }
}


function onEditDeleteClientClick(e) {
  e.stopPropagation();
  $('.delete-person-popup').fadeOut();
  var popup = $('.action-with-person-popup');
  var block = $(e.target.closest('.cmncting__client'));
  block.append(popup);
  $(document).one('click', function(e) {
      popup.fadeOut();
  });
  popup.fadeIn().css('display', 'flex');
}


function onDeleteClientClick(e) {
  e.stopPropagation();
  var popup = $('.delete-person-popup');
  var block = $(e.target.closest('.cmncting__client'));
  block.append(popup);
  popup.fadeIn();
  //$('.black-overlay').on('click', deleteClientPopupHide);
  $('.delete-person-popup__btn').on('click', deleteClientPopupHide);
  $(document).one('click', function(e) {
      popup.fadeOut();
  });
}


function onTransactionInputPopupShow(e, values, callback) {
  e.stopPropagation();
  var currentValue = e.target.value;
  var input = e.target;
  var popup = $('.transaction-input-popup');
  popup.empty();
  for (var i = 0; i < values.length; i++) {
    var id = "transaction-popup-" + i;
    var item = document.createElement('div');
    item.className = "popup-item";
    var ischecked = (currentValue != '' && values[i].indexOf(currentValue) != -1);
    var str = '<input type="radio" id="' + id + '" name="transaction-popup"' + (ischecked ? ' checked' : '') + '/>';
    str += '<label for="' + id + '">' + values[i] + '</label>';
    item.innerHTML = str;
    item.value = values[i];
    $(item).on('click', function(e) {
        input.value = $(e.target).closest('.popup-item').text();
        $( input).trigger( "change" );
        popup.fadeOut();
    });
    popup.append(item);
  }
  $('.overlay').fadeIn();
  popup.css({top: e.pageY + 'px'});
  popup.fadeIn();
  $(document).one('click', function(e) {
      $('.overlay').fadeOut();
      popup.fadeOut();
  });/**/
}

function onSectorShow(e, blockSelector) {
  if (e.target.value != '') {
    if ($(blockSelector) != []) {
      $(blockSelector).fadeIn();
    }
  }
}

(function($) {

  $(document).ready(function() {

    $('main').css('paddingTop', $('header').height() + 16 + ($('.client-main__title').height() ? $('.client-main__title').height() + 20 : 0));
    $('.cover').on('click', function() {
      $(this).removeClass('cover--is-visible')
      $('.menubar').removeClass('menubar--is-visible');
      $('.search-panel').removeClass('search-panel--is-visible');
    });
    $('.leaderboard__others').hide();

    $('.js-show-leaderboard').on('click', function() {
      $('.leaderboard__others').slideToggle();
      $(this).find('.btn__icon').toggleClass('rotate');
    });

    $('.js-show-contacts-filter').on('click', function() {
      $('.filter-options').slideToggle();
      $(this).find('.btn__icon').toggleClass('rotate');
    });

    var hide = false;
    function hideOverlay() {
      hide = false;
      $('.overlay').each(function() {
        if ($(this).css("display") !== 'none') {
          $('.overlay').fadeOut();
          $('.todo-mail-overlay').fadeOut();
          $('.todo__phone-overlay').fadeOut();
          $('.todo-follow-overlay').fadeOut();
          $('.todo-note-overlay').fadeOut();
          return hide = true;
        };
      })
    }

    $('.js-phone-overlay').on('click', function() {
      hideOverlay();
      if(hide === false) {
        $(this).find('.overlay').fadeIn();
        $(this).find('.todo__phone-overlay').fadeIn().css('display', 'flex');
      } else {
        return false;
      }
    });

    $('.js-mail-overlay').on('click', function() {
      hideOverlay();
      if(hide === false) {
        $(this).find('.overlay').fadeIn();
        $(this).find('.todo-mail-overlay').fadeIn().css('display', 'flex');
      } else {
        return false;
      }
    });

    $('.js-note-overlay').on('click', function() {
      hideOverlay();
      if(hide === false) {
        $(this).find('.overlay').fadeIn();
        $(this).find('.todo-note-overlay').fadeIn().css('display', 'flex');
        $(this).find('.todo-note-overlay .note-input').focus();
      }
    })

    // $('.mail-overlay-item').on('click', function(e) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   $('.overlay').fadeOut();
    //   $('.todo-mail-overlay').fadeOut();
    // });

    $('.js-no-answer').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.overlay').fadeOut();
      $('.todo__phone-overlay').fadeOut();
    })

    $('.js-dont-call').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).parent().parent().parent().find('.todo-mail-overlay').fadeOut();
      $(this).parent().parent().find('.todo-note-overlay').fadeIn().css('display', 'flex');
      $(this).parent().parent().find('.todo-note-overlay .note-input').focus();
      $('.todo__phone-overlay').fadeOut();
      //$('.overlay').fadeOut();
      //$('.todo__phone-overlay').fadeOut();
    })

    $('.js-positive').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // $(this).parent().parent().parent().find('.overlay').fadeOut();
      $(this).parent().parent().parent().find('.todo-mail-overlay').fadeOut();
      $('.todo__phone-overlay').fadeOut();
      $(this).parent().parent().find('.todo-note-overlay').fadeIn().css('display', 'flex');
      $(this).parent().parent().find('.todo-note-overlay .note-input').focus();
    })

    $('.js-follow').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // $(this).parent().parent().parent().find('.overlay').fadeOut();
      $(this).parent().parent().parent().find('.todo__phone-overlay').fadeOut();
      $(this).parent().parent().find('.todo-follow-overlay').fadeIn().css('display', 'flex');
    })

    $('.follow-next').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).parent().parent().parent().find('.todo-follow-overlay').fadeOut();
      $(this).parent().parent().find('.todo-note-overlay').fadeIn().css('display', 'flex');
      $(this).parent().parent().find('.todo-note-overlay .note-input').focus();
    })

    $('.js-mail-overlay .note-back-button').on('click', function(e) {
      e.stopPropagation();
      $(this).parent().parent().find('.todo-note-overlay').fadeOut();
      $(this).parent().parent().find('.overlay').fadeIn();
      $(this).parent().parent().find('.todo-mail-overlay').fadeIn().css('display', 'flex');
    })

    $('.js-note-overlay  .note-back-button').on('click', function(e) {
      e.stopPropagation();
      $(this).parent().parent().find('.todo-note-overlay').fadeOut();
      $(this).parent().parent().find('.overlay').fadeOut();
    })

    $('.js-phone-overlay .note-back-button').on('click', function(e) {
      e.stopPropagation();
      $(this).parent().parent().find('.todo-note-overlay').fadeOut();
      $(this).parent().parent().find('.overlay').fadeIn();
      $(this).parent().parent().find('.todo__phone-overlay').fadeIn().css('display', 'flex');
    })

    $('.follow-back-button').on('click', function(e) {
      e.stopPropagation();
      $(this).parent().parent().find('.todo-follow-overlay').fadeOut();
      $(this).parent().parent().find('.overlay').fadeIn();
      $(this).parent().parent().find('.todo__phone-overlay').fadeIn().css('display', 'flex');
    })

    $('.js-phone-overlay .note-completed').on('click', function(e) {
      e.stopPropagation();
      $(this).parent().parent().find('.todo-note-overlay').fadeOut();
      $('.overlay').fadeOut();
      //$(this).parent().parent().find('.overlay').fadeIn();
      //$(this).parent().parent().find('.todo__phone-overlay').fadeIn().css('display', 'flex');
    })

    $('.js-note-overlay .note-completed').on('click', function(e) {
      e.stopPropagation();
      $(this).parent().parent().find('.todo-note-overlay').fadeOut();
      $('.overlay').fadeOut();
    })

    $('.js-create-new').on('click', function() {
      $('.js-popup').fadeIn();
      $('.black-overlay').fadeIn();
    })

    $('.js-close-popup').on('click', function() {
      $('.popup').fadeOut();
      $('.black-overlay').fadeOut();
    })

    $('.js-new-task').on('click', function() {
      $('.popup').fadeOut();
      $('.popup-todo').fadeIn();
      preparePopupTodoPage();
    });

    $('.js-tab').on('click', function(e) {
      e.preventDefault();
      $('.hor-tabs li').removeClass('active');
      var target = $(this).data('tab');
      $(this).parent('li').addClass('active');
      $('.tabs-content > div').each(function() {
        if ($(this).hasClass(target)) {
          $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      })      
    });

    //$('.js-edit-delete').on('click', onEditDeleteClientClick);

    $('.js-edit-button').on('click', function(e) {
      window.location = 'contact-new.html';
    });


    $('.js-delete-button').on('click', onDeleteClientClick);

    /*
    $('.js-delete-button').on('click', function(e) {
      $('.action-with-person-popup').fadeOut();
      $('.delete-person-popup').fadeIn();
      $('.black-overlay').on('click', deleteClientPopupHide);
      $('.delete-person-popup__btn').on('click', deleteClientPopupHide);
    });$('.cmncting__button').on('click', function(e) {
      e.preventDefault();
      $(document).off('click');

      var btnClassName = this.children[0].className;

      $(document).on('click', function(e) {
        if ($(e.target).closest('.js-edit-delete').length || $(e.target).is('.js-edit-delete')) {

          if (btnClassName.indexOf('edit') != -1) {
            window.location = 'contact-new.html';
          } else {
            $('.black-overlay').fadeIn();
            $('.delete-person-popup').fadeIn();
            $('.black-overlay').on('click', deleteClientPopupHide);
            $('.delete-person-popup__btn').on('click', deleteClientPopupHide);
          }
          $(document).off('click');
        } else {
          if (!$(e.target).closest('.cmncting__button').length && !$(e.target).is('.cmncting__button')) {
            $(document).off('click');
          }
        }
      });

    });//$('.cmncting__button').on('click') ended*/
    if ($('.new-client__clickable-block')) {
      setClickableBlocksListener();
    }


    if ($('.casl__tabcontent#log')) {
      setInfiniteScrollListeners('#log .infinite-scroll-list', 4, createLogItem);
    }

    if ($('.cmncting')) {
      setInfiniteScrollListeners('.cmncting .infinite-scroll-list', 10, createClientItem);
    }

    /*if ($( "#new-client__datepicker" ).length) {
      $( "#new-client__datepicker" ).datepicker({
        changeYear: true,
        beforeShow: function (textbox, instance) {
          setTimeout(function() {
            this.css({left: ($(window).width()-this.width())/2 + 'px'})
          }.bind(instance.dpDiv), 50);
        }
      });
      $("#new-client__datepicker").on('focus',function(){
        $(this).trigger('blur');
      });
    }*/
}).scroll();

})(jQuery);




var logInfo = {
    'info':[
        {
            'Type': 0,
            'Description': 'Megan is very interested in townhouse on the mountain. Request new listings.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': '34 th avenue Marie St, CA',
            'Date': '14/8/2015',
            'Person': 'John'
        },
        {
            'Type': 1,
            'Description': 'Hi Bob, I saw you  in cafe...',
            'Subject': 'Hi Bob, I saw you',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': '34 th avenue Marie St, CA',
            'Date': '14/8/2015',
            'Person': 'Abrakham'
        },
        {
            'Type': 0,
            'Description': 'Megan is very interested in townhouse on the mountain. Request new listings.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': '34 th avenue Marie St, CA',
            'Date': '14/8/2015',
            'Person': 'John'
        },
        {
            'Type': 1,
            'Description': 'Hi Bob, I saw you  in cafe...',
            'Subject': 'Hi Bob, I saw you',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': '34 th avenue Marie St, CA',
            'Date': '14/8/2015',
            'Person': 'Abrakham'
        },
        {
            'Type': 0,
            'Description': 'Megan is very interested in townhouse on the mountain. Request new listings.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': '34 th avenue Marie St, CA',
            'Date': '14/8/2015',
            'Person': 'John'
        },
        {
            'Type': 1,
            'Description': 'Hi Bob, I saw you  in cafe...',
            'Subject': 'Hi Bob, I saw you',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': '34 th avenue Marie St, CA',
            'Date': '14/8/2015',
            'Person': 'Abrakham'
        },
        {
            'Type': 1,
            'Description': 'Hi Josh, I saw your add in the paper ...',
            'Subject': 'I saw your add in the paper',
            'Date': '12/8/2015',
            'Person': 'Megan'
        },
        {
            'Type': 0,
            'Description': '34 th avenue Marie St, CA',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 1,
            'Description': 'Hi Josh, I saw your add in the paper ...',
            'Subject': 'I saw your add in the paper',
            'Date': '12/8/2015',
            'Person': 'Bob'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': 'Megan is very interested in townhouse on the mountain. Request new listings.',
            'Date': '12/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 1,
            'Description': 'Hi Josh, I saw your add in the paper ...',
            'Subject': 'I saw your add in the paper',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Alfred is very interested in townhouse on the mountain. Request new listings',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': 'Megan is very interested in townhouse on the mountain. Request new listings.',
            'Date': '12/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 1,
            'Description': 'Hi Josh, I saw your add in the paper ...',
            'Subject': 'I saw your add in the paper',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Alfred is very interested in townhouse on the mountain. Request new listings',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': 'Megan is very interested in townhouse on the mountain. Request new listings.',
            'Date': '12/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 1,
            'Description': 'Hi Josh, I saw your add in the paper ...',
            'Subject': 'I saw your add in the paper',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Alfred is very interested in townhouse on the mountain. Request new listings',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 0,
            'Description': 'Megan is very interested in townhouse on the mountain. Request new listings.',
            'Date': '12/8/2015',
            'Person': 'Richard Keen'
        },
        {
            'Type': 1,
            'Description': 'Hi Josh, I saw your add in the paper ...',
            'Subject': 'I saw your add in the paper',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Alfred is very interested in townhouse on the mountain. Request new listings',
            'Date': '12/8/2015',
            'Person': 'Jason Seib'
        },
        {
            'Type': 0,
            'Description': 'Future follow up on megan. Nearly deal.',
            'Date': '14/8/2015',
            'Person': 'Richard Keen'
        }
    ]
};
var clientsListInfo = {
    'info':[
        {
            'Category': 'Actively Showing',
            'Name': 'Matthew Sylvain Lanneister',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'John Seib',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Megan Rain',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Adeline Emily',
            'Address': '34 th avenue Marie St, CA',
            'Phone': '955-044-8240'
        },
        {
            'Category': 'Actively Showing',
            'Name': 'Evangeline Pieters',
            'Address': '22 Weir St West, Hamilton Ontario',
            'Phone': '905-815-5503'
        }
      ]
    };


