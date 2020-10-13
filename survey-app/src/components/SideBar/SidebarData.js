import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as MdIcons from 'react-icons/md'
import * as HiIcons from 'react-icons/hi'


export const SignInData = [
    {
        title: 'SignIn',
        path: '/overview/home',
        icon: <FaIcons.FaSignInAlt />,
    }
]

 
export const SidebarData = [
    {
        title: 'Account',
        path: '/account',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'My Account',
                path: '/account/myaccount',
                icon: <MdIcons.MdAccountCircle />,
            },
            {
                title: 'Signout',
                path: '/overview',
                icon: <RiIcons.RiTeamLine />,
            },
        ]

    },
    {
        title: 'Overview',
        path: '/overview',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Users',
                path: '/overview/users',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Teams',
                path: '/overview/teams',
                icon: <IoIcons.IoIosPaper />,
            },
        ]

    },
    {
        title: 'Survey',
        path: '/survey',
        icon: <RiIcons.RiSurveyLine />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Surveys',
                path: '/survey/surveys',
                icon: <RiIcons.RiSurveyLine />,
            },
            {
                title: 'Add Survey',
                path: '/survey/addsurvey',
                icon: <AiIcons.AiFillFileAdd />,
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