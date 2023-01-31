import { ComponentPageInterface, ComponentTreeInterface } from '../../component/component.interfaces'
import Template from '../../component/Template'

const ui: ComponentTreeInterface = {
  "tag": "Popover",
  "class": "{classes.container}",
  "children": [
    {
      "tag": "div",
      "class": "{classes._container.header}",
      "children": [
        {
          "tag": "div",
          "class": "{classes._container._header.logo}",
          "children": [
            {
              "tag": "Link",
              "href": "/",
              "class": "{classes._container._header._logo.image}",
              "children": [
                {
                  "tag": "span",
                  "class": "{classes._container._header._logo.label}",
                  "children": [
                    "{t('logoTitle')}"
                  ]
                },
                {
                  "tag": "Image",
                  "src": "{logo.path}",
                  "alt": "{t('logoTitle')}",
                  "width": "{logo.width}",
                  "height": "{logo.height}"
                }
              ]
            }
          ]
        },
        {
          "tag": "div",
          "class": "{classes._container._header.mobile}",
          "children": [
            {
              "tag": "Popover.Button",
              "class": "{classes._container._header._mobile.button}",
              "children": [
                {
                  "tag": "span",
                  "class": "{classes._container._header._mobile._button.label}",
                  "children": [
                    "{t('mobileMenu')}"
                  ]
                },
                {
                  "tag": "Bars3Icon",
                  "aria-hidden": "true",
                  "class": "{classes._container._header._mobile._button.icon}"
                }
              ]
            }
          ]
        },
        {
          "tag": "nav",
          "class": "{classes._container._header.navigation}",
          "children": [
            "{navigation.map((link: LinkInterface) => (",
            {
              "tag": "Link",
              "key": "{link.key}",
              "href": "{link.path}",
              "class": "{classes._container._header._navigation.link}",
              "children": [
                "{t(`navigation.${link.key}`)}"
              ]
            },
            "))}"
          ]
        },
        "{buttons && (",
        {
          "tag": "div",
          "class": "{classes._container._header.buttons}",
          "children": [
            "{buttons.secondary && (",
            {
              "tag": "Link",
              "href": "{buttons.secondary.path}",
              "class": "{classes._container._header._buttons.secondary}",
              "children": [
                "{t(`buttons.secondary`)}"
              ]
            },
            ")} {buttons.primary && (",
            {
              "tag": "Link",
              "href": "{buttons.primary.path}",
              "class": "{classes._container._header._buttons.primary}",
              "children": [
                "{t(`buttons.primary`)}"
              ]
            },
            ")}"
          ]
        },
        ")}"
      ]
    },
    {
      "tag": "Transition",
      "as": "{Fragment}",
      "enter": "duration-200 ease-out",
      "enterFrom": "opacity-0 scale-95",
      "enterTo": "opacity-100 scale-100",
      "leave": "duration-100 ease-in",
      "leaveFrom": "opacity-100 scale-100",
      "leaveTo": "opacity-0 scale-95",
      "children": [
        {
          "tag": "Popover.Panel",
          "focus": "true",
          "class": "{classes._container.panel}",
          "children": [
            {
              "tag": "div",
              "class": "{classes._container._panel.header}",
              "children": [
                {
                  "tag": "div",
                  "class": "{classes._container._panel._header.top}",
                  "children": [
                    {
                      "tag": "div",
                      "class": "{classes._container._panel._header._top.logo}",
                      "children": [
                        {
                          "tag": "div",
                          "class": "{classes._container._panel._header._top._logo.image}",
                          "children": [
                            {
                              "tag": "Image",
                              "src": "{logo.path}",
                              "alt": "{t('logoTitle')}",
                              "width": "{logo.width}",
                              "height": "{logo.height}"
                            }
                          ]
                        },
                        {
                          "tag": "div",
                          "class": "{classes._container._panel._header._top._logo.mobile}",
                          "children": [
                            {
                              "tag": "Popover.Button",
                              "class": "{classes._container._panel._header._top._logo._mobile.button}",
                              "children": [
                                {
                                  "tag": "span",
                                  "class": "{classes._container._panel._header._top._logo._mobile._button.label}",
                                  "children": [
                                    "{t('mobileMenu')}"
                                  ]
                                },
                                {
                                  "tag": "XMarkIcon",
                                  "aria-hidden": "true",
                                  "class": "{classes._container._panel._header._top._logo._mobile._button.icon}"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "tag": "div",
                  "class": "{classes._container._panel._header.bottom}",
                  "children": [
                    {
                      "tag": "div",
                      "class": "{classes._container._panel._header._bottom.navigation}",
                      "children": [
                        "{navigation.map((link: LinkInterface) => (",
                        {
                          "tag": "Link",
                          "key": "{link.key}",
                          "href": "{link.path}",
                          "class": "{classes._container._panel._header._bottom._navigation.link}",
                          "children": [
                            "{t(`navigation.${link.key}`)}"
                          ]
                        },
                        "))}"
                      ]
                    },
                    "{buttons && (",
                    {
                      "tag": "div",
                      "class": "{classes._container._panel._header._bottom.buttons}",
                      "children": [
                        "{buttons.primary && (",
                        {
                          "tag": "Link",
                          "href": "{buttons.primary.path}",
                          "class": "{classes._container._panel._header._bottom._buttons.primary}",
                          "children": [
                            "{t(`buttons.primary`)}"
                          ]
                        },
                        ")} {buttons.secondary && (",
                        {
                          "tag": "Link",
                          "href": "{buttons.secondary.path}",
                          "class": "{classes._container._panel._header._bottom._buttons.secondary}",
                          "children": [
                            "{t(`buttons.secondary`)}"
                          ]
                        },
                        ")}"
                      ]
                    },
                    ")}"
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default function Header(props: ComponentPageInterface) {
  return (<Template ui={ui} {...props} />)
}