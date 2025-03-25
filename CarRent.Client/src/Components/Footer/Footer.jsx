import React from 'react'
import Logo from '../Logo'
import FooterLinks from './FooterLinks'
import { Copyright } from 'lucide-react'

export default function Footer() {
  return (
     <footer className='bg-gray-100 md:bg-white w-full px-7 md:px-10 py-6 md:pb-12 mt-auto'>
        <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 pb-10'>
                <div className='max-w-[350px] space-y-3'>
                    <Logo/>
                    <p className='text-gray-400 leading-7'>Our vision is to provide convenience and help increase your sales business.</p>
                </div>
                <div className='grid grid-cols-2 gap-10 lg:grid-cols-3 w-full lg:max-w-[600px]'>
                    <FooterLinks 
                        title="About" 
                        links={["How it works","Featured","Partnership","Business Relation"]}
                    />
                    <FooterLinks 
                        title="Socials"
                        links={["Discord","Instagram","Twitter","Facebook"]}
                    />
                    <FooterLinks 
                        title="Community"
                        links={["Events","Blog","Podcast","Invite a friend"]}
                    />
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row justify-between gap-8 pt-8 md:border-t border-gray-300'>
                <p className='text-sm md:text-base flex items-center'>
                    <Copyright size={16} className='mr-1'/>
                    RENTCAR. All rights reserved
                </p>
                <div className='flex justify-between gap-10 text-sm md:text-base min-w-[200px]'>
                    <p>Privacy & Policy</p>
                    <p>Terms & Conditions</p>
                </div>
            </div>
        </div>
     </footer>
  )
}
