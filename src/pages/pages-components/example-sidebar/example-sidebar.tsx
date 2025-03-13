import './example-sidebar.scss';
import { useState} from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import {navItems} from '../../../const.ts';

function ExampleSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Варианты анимации для сайдбара
  const sidebarVariants = {
    closed: {
      width: '3vw',
      transition: { duration: 0.3 }
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
      x: '10%', // Перемещение к центру
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  // Варианты анимации для появляющегося текста
  const additionalTextVariants = {
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.3 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  return (
    <motion.div
      className="example-sidebar"
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
            <ul className='sidebar-wrapper-noActive'>
              {navItems.map((item) => (
                <li key={item.text} className='sidebar__item-noActive'>
                  <div className="sidebar__item_border">
                    <img src={item.icon} alt={item.text}/>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className="additional-text"
                          variants={additionalTextVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          <a className='sidebar__link'>{item.text}</a>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>


      </div>

      <div className="sidebar-footer">
        <motion.div
          className="main-text"
          variants={textNavigation}
        >
          <div className='sidebar-footer-noActive'>
            <div className='sidebar-wrapper-footer-noActive'>
              <button className='sidebar-button_setting-noActive'>
                <span className='sidebar-button-container_setting-noActive'>
                  <img src="/img/linear_scale.png" alt="" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="additional-text"
                        variants={additionalTextVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <p>Настроить</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
              </button>
              <button className='sidebar-button_new_task-noActive'>
                <span className='sidebar-button-container_new_task-noActive'>
                  <img src="/img/add_ad.png" alt="" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="additional-text"
                        variants={additionalTextVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <p>Настроить</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
              </button>
              <button className='sidebar-button_out'>
                <span className='sidebar-button-container_out'>
                  <img src="/img/input.png" alt="" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="additional-text"
                        variants={additionalTextVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <p>Настроить</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </div>
          </div>
        </motion.div>


      </div>
    </motion.div>
  );
}

export default ExampleSidebar;
