import React from 'react'
import Logo from '../Logo'
import FooterLinks from './FooterLinks'
import { Copyright } from 'lucide-react'

export default function Footer() {
  return (
     <div className='bg-gray-100 md:bg-white w-full px-7 md:px-10 py-6 md:pb-12'>
        <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col lg:flex-row justify-between  space-y-4 pb-10'>
                <div className='max-w-[350px] mb-7 space-y-3'>
                    <Logo/>
                    <p className='text-gray-400 leading-7'>Our vision is to provide convenience and help increase your sales business.</p>
                </div>
                <div className='grid grid-cols-2 gap-10 lg:grid-cols-3'>
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
                <p className='text-sm md:text-base'>
                    <Copyright size={16} className='inline-block'/>
                    RENTCAR. All rights reserver
                </p>
                <div className='flex justify-between gap-10 text-sm md:text-base'>
                    <p>Privacy & Policy</p>
                    <p>Terms & Conditions</p>
                </div>
            </div>
        </div>
     </div>
  )
}
