define(
  'ephox.alloy.demo.ToolbarsDemo',

  [
    'ephox.alloy.api.behaviour.Behaviour',
    'ephox.alloy.api.behaviour.Toggling',
    'ephox.alloy.api.system.Attachment',
    'ephox.alloy.api.system.Gui',
    'ephox.alloy.api.ui.Button',
    'ephox.alloy.api.ui.Container',
    'ephox.alloy.api.ui.SplitToolbar',
    'ephox.alloy.api.ui.Toolbar',
    'ephox.alloy.api.ui.ToolbarGroup',
    'ephox.alloy.demo.forms.DemoRenders',
    'ephox.alloy.demo.HtmlDisplay',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Merger',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.properties.Class',
    'global!console',
    'global!document'
  ],

  function (
    Behaviour, Toggling, Attachment, Gui, Button, Container, SplitToolbar, Toolbar, ToolbarGroup, DemoRenders, HtmlDisplay, Arr, Merger, Element, Class, console,
    document
  ) {
    return function () {
      var gui = Gui.create();
      var body = Element.fromDom(document.body);
      Class.add(gui.element(), 'gui-root-demo-container');
      Attachment.attachSystem(body, gui);

      var groups = function () {
        return Arr.map([
          {
            label: 'group-1',
            items: Arr.map([
              { text: '1a', action: function () { } },
              { text: '1b', action: function () { } },
              { text: '1c', action: function () { } }

            ], DemoRenders.toolbarItem)
          },
          {
            label: 'group-2',
            items: Arr.map([
              { text: '2a', action: function () { } },
              { text: '2b', action: function () { } },
              { text: '2c', action: function () { } }

            ], DemoRenders.toolbarItem)
          },
          {
            label: 'group-3',
            items: Arr.map([
              { text: '3a', action: function () { } },
              { text: '3b', action: function () { } },
              { text: '3c', action: function () { } }

            ], DemoRenders.toolbarItem)
          },
          {
            label: 'group-4',
            items: Arr.map([
              { text: '4a', action: function () { } },
              { text: '4b', action: function () { } },
              { text: '4c', action: function () { } }

            ], DemoRenders.toolbarItem)
          },
          {
            label: 'group-5',
            items: Arr.map([
              { text: '5a', action: function () { } },
              { text: '5b', action: function () { } },
              { text: '5c', action: function () { } }

            ], DemoRenders.toolbarItem)
          },
          {
            label: 'group-6',
            items: Arr.map([
              { text: '6a', action: function () { } },
              { text: '6b', action: function () { } }

            ], DemoRenders.toolbarItem)
          },
          {
            label: 'group-7',
            items: Arr.map([
              { text: '7a', action: function () { } },
              { text: '7b', action: function () { } }

            ], DemoRenders.toolbarItem)
          }
        ], DemoRenders.toolbarGroup);
      };

      var subject = HtmlDisplay.section(
        gui,
        'This demo plays around with skinning for the Ui',
        Container.sketch({
          dom: {
            classes: [ 'mce-container' ]
          },
          components: [
            Toolbar.sketch({
              dom: {
                tag: 'div',
                styles: {
                  'overflow-x': 'auto',
                  'max-width': '200px',
                  display: 'flex'
                }
              },
              components: [
                Toolbar.parts().groups()
              ]
            })
          ]
        })
      );

      var toolbar1 = subject.components()[0];
      var gps = Arr.map(groups(), ToolbarGroup.sketch);
      Toolbar.setGroups(toolbar1, gps);

      var subject2 = HtmlDisplay.section(
        gui,
        'This toolbar has overflow behaviour that uses a more drawer',
        SplitToolbar.sketch({
          uid: 'demo-toolstrip',
          dom: {
            tag: 'div'
          },
          parts: {
            'overflow-group': DemoRenders.toolbarGroup({
              items: [ ]
            }),
            'overflow-button': {
              dom: {
                tag: 'button',
                innerHtml: 'More'
              }
            }
          },
          components: [
            SplitToolbar.parts().primary({
              dom: {
                tag: 'div',
                styles: {
                  display: 'flex'
                }
              }
            }),
            SplitToolbar.parts().overflow({
              dom: {
                tag: 'div',
                styles: {
                  display: 'flex',
                  'flex-wrap': 'wrap'
                }
              }
            })
          ],

          markers: {
            openClass: 'demo-sliding-open',
            closedClass: 'demo-sliding-closed',
            growingClass: 'demo-sliding-height-growing',
            shrinkingClass: 'demo-sliding-height-shrinking'
          }
        })
      );

      var splitToolbar = subject2;
      var gps2 = Arr.map(groups(), ToolbarGroup.sketch);
      console.log('gps2', gps2);
      SplitToolbar.setGroups(splitToolbar, gps2);

      window.addEventListener('resize', function () {
        SplitToolbar.refresh(splitToolbar);
      });
    };
  }
);