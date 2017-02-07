define(
  'ephox.alloy.docs.DocToptabs',

  [
    'ephox.alloy.api.ui.Tabbar',
    'ephox.alloy.api.ui.TabSection',
    'ephox.compass.Arr'
  ],

  function (Tabbar, TabSection, Arr) {
    var make = function (tabs) {
      return TabSection.sketch({
        dom: {
          tag: 'div',
          styles: {
            display: 'flex',
            'flex-direction': 'column'
          }
        },
        components: [
          TabSection.parts().tabbar(),
          TabSection.parts().tabview()
        ],

        tabs: tabs,
        parts: {
          tabbar: {
            
            dom: {
              tag: 'div',
              styles: {
                width: '100%',
                display: 'flex',
                border: '2px solid black',
                'margin-bottom': '10px'
              }
            },
            components: [
              Tabbar.parts().tabs()
            ],
            members: {
              tab: {
                munge: function (tSpec) {
                  return {
                    value: tSpec.value,
                    dom: {
                      tag: 'span',
                      innerHtml: tSpec.value,
                      styles: {
                        display: 'flex',
                        padding: '10px',
                        'justify-content': 'center',
                        'flex-grow': '1',
                        cursor: 'pointer'
                      }
                    }
                  };
                }
              }
            },
            markers: {
              tabClass: 'tab-item',
              selectedClass: 'selected-tab-item'
            }
          },
          tabview: {
            dom: { }
          }
        }
      });
    };

    return {
      make: make
    }; 
  }
);