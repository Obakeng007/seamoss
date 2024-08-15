import * as React from 'react';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { facebookPng, twitterPng, instagramPng, linkedinPng } from '../../assets';

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));

  const labelStyles = {
    fontWeight: 300,
    cursor: 'pointer',
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingTop: "1.5rem",
        paddingLeft: is700 ? "1rem" : "3rem",
        paddingRight: is700 ? "1rem" : "3rem",
        paddingBottom: "0.75rem",
        rowGap: "2.5rem",
        color: 'white',
        justifyContent: "space-around",
        minHeight: '50vh', // Adjust height as needed
      }}
    >
      {/* upper */}
      <Stack flexDirection={'row'} rowGap={'1rem'} justifyContent={is700 ? "" : 'space-around'} flexWrap={'wrap'}>
        <Stack rowGap={'1rem'} padding={'1rem'} color={'white'}>
          <Typography variant='h6'>Quick Links</Typography>
          <Typography sx={labelStyles}>Privacy Policy</Typography>
          <Typography sx={labelStyles}>Terms Of Use</Typography>
          <Typography sx={labelStyles}>FAQ</Typography>
          <Typography sx={labelStyles}>Contact</Typography>
        </Stack>

        <Stack rowGap={'1rem'} padding={'1rem'}>
          <Stack mt={0.6} flexDirection={'row'} columnGap={'2rem'}>
            <MotionConfig whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
              <motion.img style={{ cursor: "pointer" }} src={facebookPng} alt="Facebook" />
              <motion.img style={{ cursor: "pointer" }} src={twitterPng} alt="Twitter" />
              <motion.img style={{ cursor: "pointer" }} src={instagramPng} alt="Instagram" />
              <motion.img style={{ cursor: "pointer" }} src={linkedinPng} alt="Linkedin" />
            </MotionConfig>
          </Stack>
        </Stack>
      </Stack>

      {/* lower */}
      <Stack alignSelf={"center"}>
        <Typography>&copy; Seamoss Primed {new Date().getFullYear()}. All rights reserved</Typography>
      </Stack>
    </Stack>
  )
}
