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
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon, TimeIcon } from '@chakra-ui/icons';


const Links = ['Home', 'Login', 'Tasks'];

const MyNavLink = ({ children }: { children: ReactNode }) => (
  <Link
    as={NavLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('#4fa296', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <TimeIcon w={6} h={6} />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <MyNavLink key={link}>{link}</MyNavLink>
              ))}
            </HStack>
          </HStack>
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
              <MenuList bg={useColorModeValue('#4fa296', '#835dc7')} px={4}>
                <MenuItem to="/focus" > Overview </MenuItem>
                <MenuItem to="/focus/:id" > Current Day </MenuItem>
                <MenuItem to="/" > Profile </MenuItem>
                <MenuItem>Logout</MenuItem>
                <MenuDivider />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <MyNavLink key={link}>{link}</MyNavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
  

{/* <nav className="Navbar">
<ul>
    <li><MyNavLink to="/" end>Home</MyNavLink></li>
    <li><MyNavLink to="/login">Login</MyNavLink></li>
</ul>
</nav> */}