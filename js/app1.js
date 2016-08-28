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

function prepareNewClientPage() {
  try {
    document.getElementById('general-link').click();
    var elems = document.getElementsByClassName('new-client__clickable-block');
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener('click', onBlockCheck, false);
    }
    document.getElementById('special-features-btn').click();
  } catch(e) {
    console.log(e);
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
    var attachPane = document.getElementById('attached-clients');
    /*while (attachPane.children.length > 0) {
        attachPane.removeChild(attachPane.children[0]);
    }*/
    var clientId = parseInt(evt.target.id.replace('person', ''));
    if (isNaN(clientId))
        return;
    for (var i = 0; i < info['info'].length; i++) {
        if (info['info'][i]['Id'] == clientId)
            makeAttachedElem(attachPane, info['info'][i]);
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
    address.innerHTML = item['Address'];
    attItem.appendChild(address);
    var otherinfoElem = document.createElement('div');
    otherinfoElem.className = "result-other-info-text";
    var str = '<div>';
    if (item['e-mail'])
      str += item['e-mail'];
    else
      str += 'no info';

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

function startFindForPopupTodo(inputValue) {
    var resultPane = document.getElementById('results');
    var elems = document.getElementsByClassName('popup-todo__search-result');
    while (resultPane.children.length > 0) {
        resultPane.removeChild(resultPane.children[0]);
    }
    var result = finding(inputValue, 'Name');
    if (result.length == 0) {
        resultPane.style.display = 'none';
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
      var selectedItem = resultPane.getElementsByClassName('selected')[0];
      switch (event.keyCode) {
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
}

function hideAddPersonPopup() {
  document.getElementById('add-person-popup').style.display = 'none';
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

(function($) {

  $(document).ready(function() {
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
      $('.overlay').fadeOut();
      $('.todo__phone-overlay').fadeOut();
    })

    $('.js-positive').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // $(this).parent().parent().parent().find('.overlay').fadeOut();
      $(this).parent().parent().parent().find('.todo-mail-overlay').fadeOut();
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
      // $(this).parent().parent().parent().find('.overlay').fadeOut();
      $(this).parent().parent().parent().find('.todo-follow-overlay').fadeOut();
      $(this).parent().parent().find('.todo-note-overlay').fadeIn().css('display', 'flex');
      $(this).parent().parent().find('.todo-note-overlay .note-input').focus();
    })

    $('.note-back-button').on('click', function(e) {
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
      $(this).parent().parent().find('.overlay').fadeIn();
      $(this).parent().parent().find('.todo__phone-overlay').fadeIn().css('display', 'flex');
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
        console.log($(this));
        if ($(this).hasClass(target)) {
          $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      })      
    });

  });

})(jQuery);
