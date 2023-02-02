
import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'



    
export default function Header() {
  
  

  return (<div className="isolate bg-white">
<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
<svg viewBox="0 0 1155 678" xmlns="http://www.w3.org/2000/svg" className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]">
<path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fillOpacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" /><defs >
<linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
<stop stopColor="#9089FC" /><stop offset={1} stopColor="#FF80B5" />
</linearGradient>
</defs>
</svg>
</div><div className="px-6 pt-6 lg:px-8">
<nav aria-label="Global" className="flex items-center justify-between">
<div className="flex lg:flex-1">
<Link href="#" className="-m-1.5 p-1.5">
<span className="sr-only">
Your Company
</span><Image src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-8" />
</Link>
</div><div className="flex lg:hidden">
<button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
<span className="sr-only">
Open main menu
</span><Bars3Icon aria-hidden="true" className="h-6 w-6" />
</button>
</div><div className="hidden lg:flex lg:gap-x-12">
{navigation.map((item) => (<Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
{item.name}
</Link>))}
</div><div className="hidden lg:flex lg:flex-1 lg:justify-end">
<Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
Log in<span aria-hidden="true">
&rarr;
</span>
</Link>
</div>
</nav><Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
<Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
<div className="flex items-center justify-between">
<Link href="#" className="-m-1.5 p-1.5">
<span className="sr-only">
Your Company
</span><Image src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-8" />
</Link><button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
<span className="sr-only">
Close menu
</span><XMarkIcon aria-hidden="true" className="h-6 w-6" />
</button>
</div><div className="mt-6 flow-root">
<div className="-my-6 divide-y divide-gray-500/10">
<div className="space-y-2 py-6">
{navigation.map((item) => (<Link key={item.name} href={item.href} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
{item.name}
</Link>))}
</div><div className="py-6">
<Link href="#" className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10">
Log in
</Link>
</div>
</div>
</div>
</Dialog.Panel>
</Dialog>
</div><main >
<div className="relative px-6 lg:px-8">
<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
<div className="hidden sm:mb-8 sm:flex sm:justify-center">
<div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
Announcing our next round of funding.{' '}<Link href="#" className="font-semibold text-indigo-600">
<span aria-hidden="true" className="absolute inset-0" />Read more<span aria-hidden="true">
&rarr;
</span>
</Link>
</div>
</div><div className="text-center">
<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
Data to enrich your online business
</h1><p className="mt-6 text-lg leading-8 text-gray-600">
Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
</p><div className="mt-10 flex items-center justify-center gap-x-6">
<Link href="#" className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
Get started
</Link><Link href="#" className="text-base font-semibold leading-7 text-gray-900">
Learn more<span aria-hidden="true">
→
</span>
</Link>
</div>
</div>
</div><div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
<svg viewBox="0 0 1155 678" xmlns="http://www.w3.org/2000/svg" className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]">
<path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fillOpacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" /><defs >
<linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
<stop stopColor="#9089FC" /><stop offset={1} stopColor="#FF80B5" />
</linearGradient>
</defs>
</svg>
</div>
</div>
</main>
</div>)
}