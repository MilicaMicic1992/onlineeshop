import React from 'react'

//Icons
import { CiLocationOn,CiDeliveryTruck } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";


function HeaderComponent({setActiveHeader}) {
  return (
    <div className='flex items-center justify-between container mx-auto h-[80px] flex-col lg:flex-row py-[10px]'>
{/*leva strana */}
        <p><a href = "tel: +(+98) 0234 456 789"> Need help? Call us (+98) 0234 456 789
        </a></p>

{/*desna strana */}
        <div className='flex items-center gap-[10px]'>
            <div className='flex items-center gap-[5px]'>
                <CiLocationOn />
                <span>Our Store</span>
            </div>

            <div className='flex items-center gap-[5px]'>
                <CiDeliveryTruck size={24}/>
                <span>Truck Your order</span>
                <IoMdClose size={24} onClick={()=>setActiveHeader(false)}/>
            </div>
        </div>
    </div>
  )
}

export default HeaderComponent