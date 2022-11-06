import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react';

import { TimeIcon } from '@chakra-ui/icons';


function NavBar(props) {

  return (
    <div>
      <Box bg={useColorModeValue('#4fa296', 'gray.900')} px={4}>
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
      >
        <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <TimeIcon color="#F7FAFC" w={6} h={6} />
                <Text color="#F7FAFC"> Focus: ON!</Text>
              </MenuButton >
            
              <MenuList bg={useColorModeValue('#4fa296', '#835dc7')} px={4}>
                <MenuItem as="a" href="/" > Home </MenuItem>
                <MenuItem as="a" href="/login" > Login </MenuItem>
              </MenuList>
            </Menu>
        
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://cdn3.iconfinder.com/data/icons/yumminky-pc/100/yumminky-pc-43-512.png'
                  }
                />
              </MenuButton >



{/* Right-aligned stuff, based on whether user is logged in */}
{
    props.user
        ?   
            (

              <MenuList bg="#4fa296" px={4}>
                <MenuItem as="a" href={`/profile/${props.user.id}`}>Profile ({props.user.username})</MenuItem>
                <MenuItem as="a" href={`/focus/${props.user.id}`}> Overview </MenuItem>
                <MenuItem as="a" to="/" onClick={props.logoutCb}>Logout</MenuItem>
              </MenuList>
 
            )
        :
            (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                </ul>
            )
}

            </Menu>
          </Flex>
        </Flex>

      </Box>
      </div>
  );
}

export default NavBar;
