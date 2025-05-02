'use client'
import { useEffect } from 'react'

const CarouselItem = ({ img, position, showDetail, setShowDetail }) => {
  const getItemStyle = () => {
    switch(position) {
      case 1:
        return {
          transform: 'var(--item1-transform)',
          filter: 'var(--item1-filter)',
          zIndex: 'var(--item1-zIndex)',
          opacity: 'var(--item1-opacity)',
          pointerEvents: 'none'
        }
      case 2:
        return {
          transform: showDetail ? 'none' : 'var(--item2-transform)',
          filter: showDetail ? 'none' : 'var(--item2-filter)',
          zIndex: showDetail ? '12' : 'var(--item2-zIndex)',
          opacity: 'var(--item2-opacity)',
          width: showDetail ? '100%' : '70%'
        }
      case 3:
        return {
          transform: showDetail ? 'translateX(100%)' : 'var(--item3-transform)',
          filter: showDetail ? 'none' : 'var(--item3-filter)',
          zIndex: showDetail ? '0' : 'var(--item3-zIndex)',
          opacity: showDetail ? '0' : 'var(--item3-opacity)',
          pointerEvents: showDetail ? 'none' : 'auto'
        }
      case 4:
        return {
          transform: showDetail ? 'translateX(100%)' : 'var(--item4-transform)',
          filter: showDetail ? 'none' : 'var(--item4-filter)',
          zIndex: showDetail ? '0' : 'var(--item4-zIndex)',
          opacity: showDetail ? '0' : 'var(--item4-opacity)',
          pointerEvents: showDetail ? 'none' : 'auto'
        }
      case 5:
        return {
          transform: 'var(--item5-transform)',
          filter: 'var(--item5-filter)',
          zIndex: 'var(--item5-zIndex)',
          opacity: 'var(--item5-opacity)',
          pointerEvents: 'none'
        }
      default:
        return { opacity: '0' }
    }
  }

  const itemStyle = getItemStyle()

  return (
    <div 
      className={`item ${position === 2 && showDetail ? 'showDetail' : ''}`} 
      style={{
        position: 'absolute',
        left: position === 2 && showDetail ? '0%' : '0%',
        width: itemStyle.width || '70%',
        height: '100%',
        fontSize: '15px',
        transition: 'left 0.5s, opacity 0.5s, width 0.5s',
        transform: itemStyle.transform,
        filter: itemStyle.filter,
        zIndex: itemStyle.zIndex,
        opacity: itemStyle.opacity,
        pointerEvents: itemStyle.pointerEvents
      }}
    >
      <img 
        src={img} 
        alt={`Product ${position}`} 
        style={{
          width: position === 2 && showDetail ? '50%' : '50%',
          position: 'absolute',
          right: position === 2 && showDetail ? '50%' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'right 1.5s'
        }}
      />
      
      {/* Introduce section */}
      <div 
        className="introduce" 
        style={{
          opacity: position === 2 && !showDetail ? 1 : 0,
          pointerEvents: position === 2 && !showDetail ? 'auto' : 'none',
          width: '400px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'opacity 0.5s'
        }}
      >
        <div className="title" style={{ fontSize: '2em', fontWeight: '500', lineHeight: '1em' }}>DESIGN SLIDER</div>
        <div className="topic" style={{ fontSize: '4em', fontWeight: '500' }}>Aerphone</div>
        <div className="des" style={{ fontSize: 'small', color: 'rgba(85, 85, 85, 0.6)' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.
        </div>
        <button 
          className="seeMore" 
          onClick={() => setShowDetail(true)}
          style={{
            fontFamily: 'Poppins',
            marginTop: '1.2em',
            padding: '5px 0',
            border: 'none',
            borderBottom: '1px solid #555',
            backgroundColor: 'transparent',
            fontWeight: 'bold',
            letterSpacing: '3px',
            transition: 'background 0.5s'
          }}
        >
          SEE MORE ↗
        </button>
      </div>
      
      {/* Detail section */}
      <div 
  className="detail" 
  style={{
    opacity: position === 2 && showDetail ? 1 : 0,
    pointerEvents: position === 2 && showDetail ? 'auto' : 'none',
    width: '50%',
    height: '100%', // Ajoutez cette ligne
    position: 'absolute',
    right: '0',
    top: '0', // Changez de '50%' à '0'
    transform: position === 2 && showDetail ? 'translateY(0)' : 'translateY(-50%)',
    textAlign: 'right',
    transition: 'opacity 0.5s, transform 0.5s', // Ajoutez une transition
    zIndex: showDetail ? 1000 : 15, // Assurez un z-index suffisant
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}
>
        <div className="title" style={{ fontSize: '4em' }}>Aerphone GHTK</div>
        <div className="des" style={{ marginTop: '20px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi.
        </div>
        <div 
          className="specifications" 
          style={{ 
            display: 'flex', 
            gap: '10px', 
            width: '100%', 
            borderTop: '1px solid rgba(85, 85, 85, 0.3)',
            marginTop: '20px'
          }}
        >
          {['Used Time', 'Charging port', 'Compatible', 'Bluetooth', 'Controlled'].map((spec, i) => (
            <div key={i} style={{ width: '90px', textAlign: 'center', flexShrink: '0' }}>
              <p style={{ fontWeight: 'bold' }}>{spec}</p>
              <p>{['6 hours', 'Type-C', 'Android', '5.3', 'Touch'][i]}</p>
            </div>
          ))}
        </div>
        <div className="checkout" style={{ marginTop: '20px' }}>
          <button style={{ fontFamily: 'Poppins', backgroundColor: 'transparent', border: '1px solid rgba(85, 85, 85, 0.5)', marginLeft: '5px', padding: '5px 10px', letterSpacing: '2px', fontWeight: '500' }}>
            ADD TO CART
          </button>
          <button style={{ fontFamily: 'Poppins', backgroundColor: '#693EFF', color: '#eee', border: '1px solid rgba(85, 85, 85, 0.5)', marginLeft: '5px', padding: '5px 10px', letterSpacing: '2px', fontWeight: '500' }}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem