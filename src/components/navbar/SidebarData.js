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
        title: 'Overview',
        path: '/overview',
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
        title: 'Results',
        path: '/results',
        icon: <HiIcons.HiDocumentReport />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Projects',
                path: '/results/projects',
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
    }
]