define(
  'ephox.alloy.api.ui.Dropdown',

  [
    'ephox.alloy.api.behaviour.Composing',
    'ephox.alloy.api.behaviour.Highlighting',
    'ephox.alloy.api.behaviour.Keying',
    'ephox.alloy.api.behaviour.Toggling',
    'ephox.alloy.api.ui.UiBuilder',
    'ephox.alloy.dropdown.Beta',
    'ephox.alloy.parts.InternalSink',
    'ephox.alloy.parts.PartType',
    'ephox.alloy.ui.common.ButtonBase',
    'ephox.alloy.ui.schema.DropdownSchema',
    'ephox.boulder.api.FieldSchema',
    'ephox.highway.Merger',
    'ephox.peanut.Fun',
    'ephox.perhaps.Option'
  ],

  function (Composing, Highlighting, Keying, Toggling, UiBuilder, Beta, InternalSink, PartType, ButtonBase, DropdownSchema, FieldSchema, Merger, Fun, Option) {
    var schema = DropdownSchema.schema();
    var partTypes = DropdownSchema.parts();

    var make = function (detail, components, spec, externals) {
      return Merger.deepMerge(
        {
          events: ButtonBase.events(
            Option.some(function (component) {
              Beta.togglePopup(detail, {
                anchor: 'hotspot',
                hotspot: component
              }, component, externals).get(function (sandbox) {
                Composing.getCurrent(sandbox).each(function (current) {
                  Highlighting.highlightFirst(current);
                  Keying.focusIn(current);
                });
              });
            })
          )
        },
        {
          uid: detail.uid(),
          dom: detail.dom(),
          components: components,
          behaviours: {
            toggling: {
              toggleClass: detail.toggleClass(),
              aria: {
                'aria-expanded-attr': 'aria-expanded'
              }
            },
            coupling: {
              others: {
                sandbox: function (hotspot) {
                  return Beta.makeSandbox(detail, {
                    anchor: 'hotspot',
                    hotspot: hotspot
                  }, hotspot, {
                    onOpen: function () { Toggling.select(hotspot); },
                    onClose: function () { Toggling.deselect(hotspot); }
                  });
                }
              }
            },
            keying: {
              mode: 'execution',
              useSpace: true
            },
            focusing: true
          },

          eventOrder: {
            // Order, the button state is toggled first, so assumed !selected means close.
            'alloy.execute': [ 'toggling', 'alloy.base.behaviour' ]
          }
        },
        {
          dom: {
            attributes: {
              role: detail.role().getOr('button')
            }
          }
        }
      );
    };

    var sketch = function (spec) {
      return UiBuilder.composite(DropdownSchema.name(), schema, partTypes, make, spec);
    };

    // TODO: Remove likely dupe
    var parts = PartType.generate(DropdownSchema.name(), partTypes);

    return {
      sketch: sketch,
      parts: Fun.constant(parts)
    };
  }
);