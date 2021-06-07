import React from 'react'
//import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as HiIcons from 'react-icons/hi'


 
export const SidebarData = [
    {
        title: 'Account',
        path: '/account',
        icon: <AiIcons.AiOutlineFundView />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiOutlineDashboard />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: 'Overview',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: 'Projects',
        path: '/projects',
        icon: <RiIcons.RiSurveyLine />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Create Project',
                path: '/projects/create-project',
                icon: <IoIcons.IoIosPaper />,
            },
        ]

    },
    
    {
        title: 'Reports',
        path: '/reports',
        icon: <HiIcons.HiDocumentReport />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Analytics',
                path: '/reports/analytics',
                icon: <HiIcons.HiDocumentReport />,
            },
            {
                title: 'Tabular',
                path: '/reports/tabulator',
                icon: <HiIcons.HiDocumentReport />,
            }
        ]
    }
]