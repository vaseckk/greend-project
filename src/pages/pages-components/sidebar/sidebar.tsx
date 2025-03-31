import './sidebar.scss';
import { useState} from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import {navItems} from '../../../const.ts';

function ExampleSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Варианты анимации для сайдбара
  const sidebarVariants = {
    closed: {
      width: '3vw',
      transition: { duration: 0.35 }
    },
    open: {
      width: '15vw',
      transition: { duration: 0.3 }
    }
  };

  // Варианты анимации для основного текста
  const textTitle = {
    closed: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const textNavigation = {
    closed: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    open: {
      x: 0, // Перемещение к центру
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const buttonFooter = {
    closed: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const buttonFooterBlock = {
    closed: {
      width: '88%',
    },
    open: {
      width: '96%',
    }
  };

  const buttonMainNavigation = {
    closed: {
      width: '110%',
    },
    open: {
      width: '101%',
    }
  };

  const additionalTextNavigation = {
    closed: {
      opacity: 0,
      transition: { duration: 0.1}
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const additionalIcon = {
    closed: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.1 }
    },
    open: {
      opacity: 1,
      x: 10,
      transition: { duration: 0}
    }
  };

  return (
    <motion.div
      className={`example-sidebar ${isOpen ? 'sidebar-open' : ''}`}
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="sidebar-header">
        <motion.div
          className="header-text"
          variants={textTitle}
        >
          <div className="header-text__title">
            <h3>gd</h3>
          </div>
        </motion.div>
      </div>

      <div className="sidebar-main">
        <motion.div
          className="main-text"
          variants={textNavigation}
        >
          <nav className='sidebar-body-noActive'>
            <div className='sidebar-wrapper-noActive'>
              {navItems.map((item) => (
                <motion.button key={item.text} className='sidebar__item-noActive' variants={buttonMainNavigation}>
                  <div className="sidebar__item_border">
                    <motion.img src={item.icon} alt={item.text} variants={additionalIcon} />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className="additional-text"
                          variants={additionalTextNavigation}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          <p className='sidebar__link'>{item.text}</p>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              ))}
            </div>
          </nav>
        </motion.div>


      </div>

      <motion.div
        className="sidebar-footer-motion"
        variants={buttonFooter}
      >
        <div className='sidebar-wrapper-footer'>
          <motion.button className='sidebar-button_setting' variants={buttonFooterBlock}>
            <span className='sidebar-button-container_setting' >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={additionalTextNavigation}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <p>Настроить</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img src="/img/linear_scale.png" alt="" />
            </span>
          </motion.button>
          <motion.button className='sidebar-button_new_task' variants={buttonFooterBlock}>
            <span className='sidebar-button-container_new_task'>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={additionalTextNavigation}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <p>Новая задача</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img src="/img/add_ad.png" alt="" />
            </span>
          </motion.button>
          <motion.button className='sidebar-button_out' variants={buttonFooterBlock}>
            <span className='sidebar-button-container_out'>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={additionalTextNavigation}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <p>Выход</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img src="/img/input.png" alt="" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ExampleSidebar;
