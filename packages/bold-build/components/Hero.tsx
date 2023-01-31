import { ComponentPageInterface, ComponentTreeInterface } from '../../component/component.interfaces'
import Template from '../../component/Template'

const ui: ComponentTreeInterface = {
  "tag": "div",
  "class": "isolate bg-white",
  "children": [
    {
      "tag": "div",
      "class": "absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]",
      "children": [
        {
          "tag": "svg",
          "viewBox": "0 0 1155 678",
          "xmlns": "http://www.w3.org/2000/svg",
          "class": "relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]",
          "children": [
            {
              "tag": "path",
              "fill": "url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)",
              "fillOpacity": ".3",
              "d": "M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            },
            {
              "tag": "defs",
              "children": [
                {
                  "tag": "linearGradient",
                  "id": "45de2b6b-92d5-4d68-a6a0-9b9b2abad533",
                  "x1": "1155.49",
                  "x2": "-78.208",
                  "y1": ".177",
                  "y2": "474.645",
                  "gradientUnits": "userSpaceOnUse",
                  "children": [
                    {
                      "tag": "stop",
                      "stopColor": "#9089FC"
                    },
                    {
                      "tag": "stop",
                      "offset": "{1}",
                      "stopColor": "#FF80B5"
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
      "class": "px-6 pt-6 lg:px-8",
      "children": [
        {
          "tag": "nav",
          "aria-label": "Global",
          "class": "flex items-center justify-between",
          "children": [
            {
              "tag": "div",
              "class": "flex lg:flex-1",
              "children": [
                {
                  "tag": "a",
                  "href": "#",
                  "class": "-m-1.5 p-1.5",
                  "children": [
                    {
                      "tag": "span",
                      "class": "sr-only",
                      "children": [
                        "Your Company"
                      ]
                    },
                    {
                      "tag": "img",
                      "src": "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
                      "alt": "",
                      "class": "h-8"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "div",
              "class": "flex lg:hidden",
              "children": [
                {
                  "tag": "button",
                  "type": "button",
                  "onClick": "{() => setMobileMenuOpen(true)}",
                  "class": "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
                  "children": [
                    {
                      "tag": "span",
                      "class": "sr-only",
                      "children": [
                        "Open main menu"
                      ]
                    },
                    {
                      "tag": "Bars3Icon",
                      "aria-hidden": "true",
                      "class": "h-6 w-6"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "div",
              "class": "hidden lg:flex lg:gap-x-12",
              "children": [
                "{navigation.map((item) => (",
                {
                  "tag": "a",
                  "key": "{item.name}",
                  "href": "{item.href}",
                  "class": "text-sm font-semibold leading-6 text-gray-900",
                  "children": [
                    "{item.name}"
                  ]
                },
                "))}"
              ]
            },
            {
              "tag": "div",
              "class": "hidden lg:flex lg:flex-1 lg:justify-end",
              "children": [
                {
                  "tag": "a",
                  "href": "#",
                  "class": "text-sm font-semibold leading-6 text-gray-900",
                  "children": [
                    "Log in",
                    {
                      "tag": "span",
                      "aria-hidden": "true",
                      "children": [
                        "&rarr;"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "tag": "Dialog",
          "as": "div",
          "onClose": "{setMobileMenuOpen}",
          "children": [
            {
              "tag": "Dialog.Panel",
              "focus": "true",
              "class": "fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden",
              "children": [
                {
                  "tag": "div",
                  "class": "flex items-center justify-between",
                  "children": [
                    {
                      "tag": "a",
                      "href": "#",
                      "class": "-m-1.5 p-1.5",
                      "children": [
                        {
                          "tag": "span",
                          "class": "sr-only",
                          "children": [
                            "Your Company"
                          ]
                        },
                        {
                          "tag": "img",
                          "src": "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
                          "alt": "",
                          "class": "h-8"
                        }
                      ]
                    },
                    {
                      "tag": "button",
                      "type": "button",
                      "onClick": "{() => setMobileMenuOpen(false)}",
                      "class": "-m-2.5 rounded-md p-2.5 text-gray-700",
                      "children": [
                        {
                          "tag": "span",
                          "class": "sr-only",
                          "children": [
                            "Close menu"
                          ]
                        },
                        {
                          "tag": "XMarkIcon",
                          "aria-hidden": "true",
                          "class": "h-6 w-6"
                        }
                      ]
                    }
                  ]
                },
                {
                  "tag": "div",
                  "class": "mt-6 flow-root",
                  "children": [
                    {
                      "tag": "div",
                      "class": "-my-6 divide-y divide-gray-500/10",
                      "children": [
                        {
                          "tag": "div",
                          "class": "space-y-2 py-6",
                          "children": [
                            "{navigation.map((item) => (",
                            {
                              "tag": "a",
                              "key": "{item.name}",
                              "href": "{item.href}",
                              "class": "-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10",
                              "children": [
                                "{item.name}"
                              ]
                            },
                            "))}"
                          ]
                        },
                        {
                          "tag": "div",
                          "class": "py-6",
                          "children": [
                            {
                              "tag": "a",
                              "href": "#",
                              "class": "-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10",
                              "children": [
                                "Log in"
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
          ]
        }
      ]
    },
    {
      "tag": "main",
      "children": [
        {
          "tag": "div",
          "class": "relative px-6 lg:px-8",
          "children": [
            {
              "tag": "div",
              "class": "mx-auto max-w-2xl py-32 sm:py-48 lg:py-56",
              "children": [
                {
                  "tag": "div",
                  "class": "hidden sm:mb-8 sm:flex sm:justify-center",
                  "children": [
                    {
                      "tag": "div",
                      "class": "relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20",
                      "children": [
                        "Announcing our next round of funding.{' '}",
                        {
                          "tag": "a",
                          "href": "#",
                          "class": "font-semibold text-indigo-600",
                          "children": [
                            {
                              "tag": "span",
                              "aria-hidden": "true",
                              "class": "absolute inset-0"
                            },
                            "Read more",
                            {
                              "tag": "span",
                              "aria-hidden": "true",
                              "children": [
                                "&rarr;"
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
                  "class": "text-center",
                  "children": [
                    {
                      "tag": "h1",
                      "class": "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl",
                      "children": [
                        "Data to enrich your online business"
                      ]
                    },
                    {
                      "tag": "p",
                      "class": "mt-6 text-lg leading-8 text-gray-600",
                      "children": [
                        "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua."
                      ]
                    },
                    {
                      "tag": "div",
                      "class": "mt-10 flex items-center justify-center gap-x-6",
                      "children": [
                        {
                          "tag": "a",
                          "href": "#",
                          "class": "rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                          "children": [
                            "Get started"
                          ]
                        },
                        {
                          "tag": "a",
                          "href": "#",
                          "class": "text-base font-semibold leading-7 text-gray-900",
                          "children": [
                            "Learn more",
                            {
                              "tag": "span",
                              "aria-hidden": "true",
                              "children": [
                                "→"
                              ]
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
              "class": "absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]",
              "children": [
                {
                  "tag": "svg",
                  "viewBox": "0 0 1155 678",
                  "xmlns": "http://www.w3.org/2000/svg",
                  "class": "relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]",
                  "children": [
                    {
                      "tag": "path",
                      "fill": "url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)",
                      "fillOpacity": ".3",
                      "d": "M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    },
                    {
                      "tag": "defs",
                      "children": [
                        {
                          "tag": "linearGradient",
                          "id": "ecb5b0c9-546c-4772-8c71-4d3f06d544bc",
                          "x1": "1155.49",
                          "x2": "-78.208",
                          "y1": ".177",
                          "y2": "474.645",
                          "gradientUnits": "userSpaceOnUse",
                          "children": [
                            {
                              "tag": "stop",
                              "stopColor": "#9089FC"
                            },
                            {
                              "tag": "stop",
                              "offset": "{1}",
                              "stopColor": "#FF80B5"
                            }
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
      ]
    }
  ]
}

export default function Hero(props: ComponentPageInterface) {
  return (<Template ui={ui} {...props} />)
}