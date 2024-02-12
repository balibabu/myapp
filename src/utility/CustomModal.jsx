import React from 'react';

const CustomModal = ({ children, isModalOpen, setIsModalOpen, col = 'col-xl-6 col-lg-8 col-md-9 col-11', top = '15' }) => {
    return (
        <div>
            {isModalOpen &&
                <div>
                    <div onClick={() => setIsModalOpen(false)} 
                    className='z-1 top-0 start-0 position-fixed' 
                    style={{ height: '100%', width: '100%', backgroundColor:'black', opacity:'85%' }}></div>

                    <div className={`z-2 position-fixed ${col}`}
                        style={{
                            top: `${top}%`, left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}>
                        {children}
                    </div>
                </div>
            }
        </div>
    );
};

export default CustomModal;
