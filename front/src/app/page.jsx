import React from 'react'
import HeroSection from '@/components/home/Herosection'
import Filter from '@/components/common/Filter'

const page = () => {
  return (
    <div>
      <HeroSection />
     <div className='mt-10'>
      <Filter/>
     </div>

    </div>

  )
}

export default page