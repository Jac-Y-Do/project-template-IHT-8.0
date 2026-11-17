import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'

export default function EventSkeleton () {
  return (
    <Box
      aspectRatio={{ base: 16 / 9 }}
      borderRadius='xl'
      h='auto'
      w={{ base: '100%', md: '300px', lg: '300px' }}
      shadow='md'
      backgroundColor='white'
      color='black'
      p={6}
    >
      <Skeleton
        w='100%'
        aspectRatio={{ base: 16 / 9, md: 4 / 3 }}
        height='auto'
        borderRadius='md'
        mb={2}
      />

      <Stack>
        <Stack minH='280px'>
          <SkeletonText noOfLines={7} />
        </Stack>
      </Stack>
    </Box>
  )
}
