import React, { useState } from 'react';
import './Dashboard.css';
import { BiPlus, BiRefresh, BiRightArrowAlt, BiSearch, BiUser, BiX } from 'react-icons/bi';
import { BsClock, BsThreeDotsVertical } from 'react-icons/bs';
import Circle1 from './Circle1.jsx';
import Circle from './Circle.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';


const initialCategories = {
  cspm: { name: 'CSPM Executive Dashboard', widgets: [] },
  cwpp: { name: 'CWPP Dashboard', widgets: [] },
  registry: { name: 'Registry Scan', widgets: [] },
};

function Dashboard() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const toggleWidget = () =>{
    setIsWidgetOpen(!isWidgetOpen);
  }
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newWidgetName1, setNewWidgetName1] = useState('');
  const [newWidgetName2, setNewWidgetName2] = useState('');
  


  const handleAddWidget = () => {
    if (!selectedCategory) return;

    setCategories(prevCategories => {
      const updatedCategories = { ...prevCategories };
      const widgetsToAdd = [];

      [newWidgetName1, newWidgetName2].forEach(name => {
        const trimmedName = name.trim();
        if (trimmedName && !updatedCategories[selectedCategory].widgets.some(widget => widget.name === trimmedName)) {
          widgetsToAdd.push({ name: trimmedName });
        }
      });

      updatedCategories[selectedCategory].widgets.push(...widgetsToAdd);
      return updatedCategories;
    });

    setNewWidgetName1('');
    setNewWidgetName2('');
    setIsWidgetOpen(false);
  };

  const handleRemoveWidget = (catKey, widgetIndex) => {
    setCategories(prevCategories => ({
      ...prevCategories,
      [catKey]: {
        ...prevCategories[catKey],
        widgets: prevCategories[catKey].widgets.filter((_, index) => index !== widgetIndex),
      },
    }));
  };


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) =>{
    setSearchQuery(e.target.value.toLowerCase());
  }

  return (
    <div className="dashboard">
      <nav className="dashboard_nav">
        <div className="route">
          <a href="#" style={{ color: 'rgb(160, 160, 160)' }}>Home</a>
          <BiRightArrowAlt className="fa-nav" />
          <a href="#">Dashboard v2</a>
        </div>
        <div className="input_search">
          <BiSearch className="fa_search" />
          <input type="text" placeholder='Search anything...' onChange={handleSearchChange} />
        </div>
        <div className="social">
          <BiUser className='fa' />
        </div>
      </nav>

      <div className="dashboard_container">
        <div className="dashboard_top">
          <h1>CNAPP Dashboard</h1>
          <div className="dashboard_right">
            <div className='widget' onClick={toggleWidget}>
              <p>Add Widget</p>
              <BiPlus />
            </div>
            <BiRefresh className='widget_fa' />
            <BsThreeDotsVertical className='widget_fa' />
            <div className="last-two-days">
              <BsClock className="clock-icon" />
              <select name="time-range" id="time-range">
                <option value="last-2-days">Last 2 Days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="dashboard_content">
          {Object.entries(categories).map(([key, cat]) => (
            <div className="contents" key={key}>
              <p>{cat.name}</p>
              <div className="content">
                {cat.widgets
                  .filter(widget => widget.name.toLowerCase().includes(searchQuery))
                  .map((widget, index) => (
                    <div className="first" key={index}>
                        <p>{widget.name}</p>
                        {widget.name === 'cloud Accounts' && <Circle1 />}
                        {widget.name === 'cloud Account Risk Assessment' && <Circle />}
                        {widget.name !== 'cloud Accounts' && widget.name !== 'cloud Account Risk Assessment' && (
                          <>
                        <FontAwesomeIcon icon={faIndustry} className="fa_industry"/>
                        <p>No data available</p>
                        </>
                        )}
                        <BiX className="fa_cross" onClick={() => handleRemoveWidget(key, index)}/>
                    </div>
                  ))}
                <div className="widgets" onClick={toggleWidget}>
                    <div>
                        <BiPlus className="fa" />
                        <p>Add Widget</p>
                    </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isWidgetOpen && (
        <div className="widget_slidewindow open">
          <div className="top">
            <h2>Add Widget</h2>
            <BiX className="fa" onClick={toggleWidget}/>
          </div>
          <p className="p">Personalize your dashboard by adding the following widget</p>
          <nav>
            <ul>
              {Object.entries(categories).map(([key, cat]) => (
                <li key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    checked={selectedCategory === key}
                    onChange={() => setSelectedCategory(prev => prev === key ? '' : key)}
                    
                    
                  />
                  <label htmlFor={key}>{cat.name}</label>
                </li>
              ))}
            </ul>
          </nav>

          <div className="input_field">
            <input
              type="text"
              placeholder="Widget Name 1"
              value={newWidgetName1}
              onChange={(e) => setNewWidgetName1(e.target.value)}
              
            />
            <input
              type="text"
              placeholder="Widget Name 2"
              value={newWidgetName2}
              onChange={(e) => setNewWidgetName2(e.target.value)}
              
            />
          </div>
          <div className="btn">
            <button onClick={handleAddWidget}>Confirm</button>
            <button className="cancel" onClick={toggleWidget}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
