import React, { useState } from 'react'
import { useParams , Link, NavLink, Outlet } from 'react-router-dom'

function HostVanDetail() {

  const params = useParams()
  const [currentVan, setCurrentVan] = useState(null)


  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

  React.useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
        .then(res => res.json())
        .then(data => setCurrentVan(data.vans[0]))
}, [params.id])




  return (
    <section>
      <Link
                to=".."
                relative='path'
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
    {currentVan ? (
         <div className="host-van-detail-layout-container">
         <div className="host-van-detail">
             <img src={currentVan.imageUrl} />
             <div className="host-van-detail-info-text">
                 <i
                     className={`van-type van-type-${currentVan.type}`}
                 >
                     {currentVan.type}
                 </i>
                 <h3>{currentVan.name}</h3>
                 <h4>${currentVan.price}/day</h4>
             </div>
         </div>
         <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                    
                </nav>
                <Outlet context={{currentVan}} />
     </div>
    ) : <h2>Loading...</h2>}
</section>
  )
}

export default HostVanDetail