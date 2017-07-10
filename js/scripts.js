(function($) {
  $('.flatpickr').flatpickr({
    altInput: "true",
    disableMobile: "true"
  });

  $(document).ready(function() {

    $('main').css('paddingTop', $('header').height() + 16 + ($('.client-main__title').height() ? $('.client-main__title').height() + 20 : 0));
    if ($('.btn--new-todo').length > 0) {
      $('main').css('marginBottom', $('.btn--new-todo').height() + 16 + 'px');
    }
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

    $('body').on('click', '.js-create-new', function() {
      $('.js-popup').fadeIn();
      $('.black-overlay').fadeIn();
    })

    $('.js-close-popup').on('click', function() {
      $('.popup').fadeOut();
      $('.black-overlay').fadeOut();
    })

    $('body').on('click', '.js-new-task', function() {
      $('.popup').fadeOut();
      $('.popup-todo').fadeIn();
      var time = $(this).find('td');
      if (time.length) {
        var perpTime = $(time[0]).text();
        $('.js-time').val(perpTime);
      }
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


    $('.js-edit-button').on('click', function(e) {
      window.location = 'contact-new.html';
    });

    $('.js-delete-button').on('click', onDeleteClientClick);


    $('.js-edit-transaction-button').on('click', function(e) {
      window.location = 'add-edit-transaction.html';
    });

    $('.transaction-popup__button.delete-button').on('click', function(){
      $('.slided').removeClass('slided');
      $('.action-with-person-popup').fadeOut();
      $(window).off('resize',resizeTransactionPopup);
    });
    //in table with marketing list click on arrow for deleting
    $('.email-marketing__row .js-delete-managelist').on('click', function(e) {
      e.stopPropagation();
      var popup = $('.delete-list-overlay');
      var block = $(e.target.closest('.email-marketing__row'));
      block.append(popup);
      popup.fadeIn().css('display', 'flex');

      //show red popup for deleting list
      $(popup).on('click', function(e) {
        e.stopPropagation();
        popup.fadeOut();
        $('.black-overlay').fadeIn();
        $('.red-dangerous-popup').fadeIn();
        $('.black-overlay').on('click', function(e) {
          e.stopPropagation();
          $('.red-dangerous-popup').fadeOut();
          $('.black-overlay').fadeOut();
          $('.black-overlay').off('click');
        })
      });

      //hide overlay
      $(document).one('click', function(e) {
        e.stopPropagation(e);
        popup.fadeOut();
      });
    })
    //dont want delete list item, click on arrow hide
    $('.js-hide-overlay').on('click', function(e) {
      e.stopPropagation();
      $('.delete-list-overlay').fadeOut();
    })
    //in red popup for list deleting click on buttons
    $('.delete-popup__btn').on('click', function(e) {
      e.stopPropagation();
      $('.red-dangerous-popup').fadeOut();
      $('.black-overlay').fadeOut();
    })

    //show next step in list marketing
    $('.marketing-list-table .email-marketing__row:not(:first-child)').on('click', function(e) {
      var listname = $(e.target).closest('.email-marketing__row').find('.email-marketing__cell:first-child').text();
      $('.email-marketing__list-name').text(listname);
      onBlockShow('.js-managelist-step2');
      onBlockHide('.js-managelist-step1');
    })

    //add new list
    $('.js-add-email-list-btn').on('click', function(e) {
      e.stopPropagation();
      $('.black-overlay').fadeIn();
      $('.email-marketing-add-list-popup').fadeIn();
      $('.email-marketing-add-list-popup input').on('click', function(e) {
          e.stopPropagation();
      });
      $(document).one('click', function(e) {
          e.stopPropagation();
          $('.email-marketing-add-list-popup').fadeOut();
          $('.black-overlay').fadeOut();
      });
    })

    $('.js-send-email-btn').on('click', function(e) {
      e.stopPropagation();
      var coord = e.pageY - e.clientY + e.clientY/2;
      $('.black-overlay').fadeIn();
      $('.send-email-popup').fadeIn();
      $('.send-email-popup').css('marginTop', coord + 'px');
      $(".popup__yes-no-btn, .black-overlay").one('click', function(e) {
          e.stopPropagation();
          $('.send-email-popup').fadeOut();
          $('.black-overlay').fadeOut();
      });

    });

    $('#email-marketing__select-property-type').on('click tap', function(e) {
      e.stopPropagation();
      $('.black-overlay').fadeIn();
      $('.select-property-type-popup').fadeIn();
      var currentValue = $('#email-marketing__select-property-type').text().replace(' >', '');
      $(".select-property-type-popup .email-property-types label:contains('" + currentValue + "')").find('input').prop('checked', true);
      
      $(".select-property-type-popup .email-property-types label").one('click', function(e) {
        var propertyType = $(e.target).closest('li label').text();
        $('#email-marketing__select-property-type').text(propertyType + ' >');
      });

      $(document).one('click', function(e) {
          e.stopPropagation();
          $('.select-property-type-popup').fadeOut();
          $('.black-overlay').fadeOut();
      });
      return false;
    })
    $('.js-save-transaction-field').on('click', function(e) {
      e.stopPropagation();
      var requiredFields = $('.js-required-field');
      for (var i = 0; i < requiredFields.length; i++) {
        if ($(requiredFields[i]).val() == '') {
          $('.black-overlay').fadeIn();
          $('.red-dangerous-popup').fadeIn();
          $('.red-dangerous-popup').css({top: e.clientY/2});
          $(document).one('click', function(e) {
              e.stopPropagation();
              $('.red-dangerous-popup').fadeOut();
              $('.black-overlay').fadeOut();
          });
          break;
        }
      }
    })
    if ($('.new-client__clickable-block') != []) {
      setClickableBlocksListener();
    }


    if ($('.casl__tabcontent#log')) {
      setInfiniteScrollListeners('#log .infinite-scroll-list', 4, createLogItem, logInfo['info']);
    }

    if ($('.cmncting')) {
      setInfiniteScrollListeners('.cmncting .infinite-scroll-list', 10, createClientItem, clientsListInfo['info']);
    }

}).scroll();

})(jQuery);