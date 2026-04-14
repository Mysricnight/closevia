import React from 'react'
import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  Button,
  Icon,
  useColorModeValue,
  ScaleFade,
  Heading,
  Divider,
  Card,
  CardBody,
} from '@chakra-ui/react'
import { FaLink, FaBell, FaTimes } from 'react-icons/fa'
import { useTradeLoopNotifications, TradeLoopNotification } from '../hooks/useTradeLoopNotifications'

interface TradeLoopNotificationsPanelProps {
  onViewTrades?: () => void
}

/**
 * Component to display trade loop notifications
 * Shows a card with badge count and list of recent notifications
 */
const TradeLoopNotificationsPanel: React.FC<TradeLoopNotificationsPanelProps> = ({
  onViewTrades,
}) => {
  const {
    notifications,
    markAsRead,
    clearNotifications,
    unreadCount,
  } = useTradeLoopNotifications()

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const unreadBg = useColorModeValue('green.50', 'green.900')
  const unreadBorder = useColorModeValue('green.200', 'green.700')

  if (notifications.length === 0) {
    return null
  }

  return (
    <ScaleFade initialScale={0.9} in={notifications.length > 0}>
      <Card
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        mb={6}
        position="relative"
        overflow="hidden"
        boxShadow={{ base: 'md', md: 'lg' }}
      >
        {/* Accent bar */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="3px"
          bg="linear-gradient(90deg, #48bb78, #38a169)"
        />

        <CardBody pt={6} px={{ base: 3, md: 6 }} py={{ base: 4, md: 6 }}>
          <HStack 
            justify="space-between" 
            align="start" 
            mb={4}
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
            spacing={{ base: 1, md: 3 }}
          >
            <HStack spacing={3} flex={1} minW={0}>
              <Icon as={FaLink} fontSize={{ base: 'lg', md: 'xl' }} color="green.500" flexShrink={0} />
              <VStack align="start" spacing={0} minW={0}>
                <Heading size={{ base: 'sm', md: 'sm' }} noOfLines={1}>
                  Multi-Way Trade Opportunities
                </Heading>
                <Text fontSize={{ base: 'xs', md: 'xs' }} color="gray.600" noOfLines={1}>
                  {unreadCount} new {unreadCount === 1 ? 'notification' : 'notifications'}
                </Text>
              </VStack>
            </HStack>
            {unreadCount > 0 && (
              <Badge colorScheme="green" fontSize={{ base: 'xs', md: 'sm' }} flexShrink={0}>
                {unreadCount} NEW
              </Badge>
            )}
          </HStack>

          <Divider mb={3} />

          {/* Notifications list - responsive max height */}
          <VStack 
            spacing={2} 
            align="stretch" 
            maxH={{ base: '250px', sm: '300px', md: '350px' }} 
            overflowY="auto"
          >
            {notifications.map((notif) => (
              <ScaleFade key={notif.id} in={true}>
                <Box
                  bg={!notif.read ? unreadBg : 'transparent'}
                  borderColor={!notif.read ? unreadBorder : 'transparent'}
                  borderWidth={!notif.read ? '1px' : '0px'}
                  borderRadius="md"
                  p={{ base: 2, md: 3 }}
                  transition="all 0.2s"
                  _hover={{ shadow: 'sm' }}
                >
                  <HStack justify="space-between" align="start" spacing={2}>
                    <VStack align="start" spacing={1} flex={1} minW={0}>
                      <HStack spacing={2} minW={0}>
                        <Icon as={FaBell} fontSize={{ base: 'xs', md: 'sm' }} color="green.500" flexShrink={0} />
                        <Text
                          fontSize={{ base: 'xs', md: 'sm' }}
                          fontWeight={!notif.read ? 'semibold' : 'normal'}
                          noOfLines={2}
                          wordBreak="break-word"
                        >
                          {notif.message}
                        </Text>
                      </HStack>
                      <HStack spacing={2} ml={6} fontSize="xs" color="gray.600" flexWrap="wrap">
                        <Badge fontSize={{ base: '10px', md: 'xs' }} colorScheme="purple" flexShrink={0}>
                          {notif.participant_count} participants
                        </Badge>
                        <Text fontSize={{ base: '10px', md: 'xs' }} noOfLines={1}>
                          {new Date(notif.created_at).toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                    {!notif.read && (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => markAsRead(notif.id)}
                        _hover={{ bg: 'transparent', opacity: 0.7 }}
                        flexShrink={0}
                      >
                        <Icon as={FaTimes} />
                      </Button>
                    )}
                  </HStack>
                </Box>
              </ScaleFade>
            ))}
          </VStack>

          {/* Action buttons - responsive layout */}
          <HStack 
            mt={4} 
            spacing={2} 
            justify={{ base: 'center', md: 'space-between' }}
            flexWrap="wrap"
          >
            <Button
              size={{ base: 'xs', md: 'sm' }}
              variant="ghost"
              onClick={clearNotifications}
              fontSize={{ base: 'xs', md: 'sm' }}
              flex={{ base: '1 1 auto', md: 'initial' }}
              minW="fit-content"
            >
              Clear All
            </Button>
            <Button
              size={{ base: 'xs', md: 'sm' }}
              colorScheme="green"
              onClick={onViewTrades}
              leftIcon={<FaLink />}
              fontSize={{ base: 'xs', md: 'sm' }}
              flex={{ base: '1 1 auto', md: 'initial' }}
              minW="fit-content"
            >
              View Trade Chains
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </ScaleFade>
  )
}

export default TradeLoopNotificationsPanel
