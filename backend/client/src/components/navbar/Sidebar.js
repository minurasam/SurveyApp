import React, {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'
import './sidebar.css';


const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
`;

const NavIcon = styled(Link)`
    margin-left:2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;


const SidebarNav = styled.nav`
    background: #15171c;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: centre;
    position: fixed;
    top: 0;
    left: ${({ Sidebar }) => (Sidebar ? '0' : '-100%') };
    transition: 350ms;
    z-index; 10;
`;   

const SidebarWrap = styled.nav`
    width: 100%;
`;



const Sidebar = ({ }) => {
    const [Sidebar, setSidebar] = useState(false)
    
    const showSidebar = () => setSidebar(!Sidebar)
    
    
    return (
        <IconContext.Provider value={{ color: 'light blue'}}>
        <Nav>
            <NavIcon to="#" style={{position:'absolute'}}>
                <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
            <h1 style={{ marginLeft:"auto", color:"lightblue"}} >Survey Management System</h1>
            <NavIcon style={{ marginLeft:"auto"}} > 
                <AiIcons.AiOutlineNotification />
            </NavIcon>
            <NavIcon style={{ paddingRight: "10px"}} > 
                <AiIcons.AiOutlineSetting />
            </NavIcon>
        </Nav>
        <SidebarNav Sidebar = {Sidebar}>
            <SidebarWrap>
            <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar}/>
            </NavIcon>
            {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} /> 
            })}
            </SidebarWrap>
        </SidebarNav>
        </IconContext.Provider>
    )
}

export default Sidebar;
