$(function() {
  var $allItems = $('.timeline').find('.timeline-item'),
      $filteredSet = $allItems,
      $filterInput = $('.filters input:first');

  $('.filters input').on('keyup', $.debounce(300, function(e){
    var $this = $(this),
        attr = 'data-'+$this.attr('id'),
        value = $this.val();

    //if the value is empty, show the previously hidden rows
    if (this.value !== '') {
      if ($filteredSet.length == 0) {
        $filteredSet = $allItems;
      }
      $filteredSet.hide();
      $filteredSet = $filteredSet
        .filter('['+attr+'*="'+value.toLowerCase()+'"]')
        .show();
      
    //else filter the current set of visible rows
    //according to each (other) filter input's current value
    } else {
      $filteredSet = $allItems;
      $this.siblings().each(function() {
        var $this = $(this),
            attr = 'data-'+$this.attr('id'),
            value = $this.val();

        if (value !== '') {
          $filteredSet.hide();
          $filteredSet = $filteredSet
            .filter(function(){
              $(this).attr(attr).val(value.toLowerCase());
              
              // '['+attr+'*="'+value.toLowerCase()+'"]'
            })
            .show();
        }
      });
      if ($('.filters input').filter(function() { return this.value; }).length == 0) {
        $filteredSet = $allItems;
        $filteredSet.show();
      }
    }
  }));

  //clear & reset the filters
  $('.filters button').on('click', function() {
    $('.filters input').each(function() {
      var $this = $(this);
      $this.val('');
    });
    $filterInput.trigger('keyup');
  });
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
