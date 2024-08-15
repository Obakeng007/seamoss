import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, loginAsync, selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus } from '../auth/AuthSlice';
import { toast } from 'react-toastify';
import { ProductBanner } from '../products/components/ProductBanner';
import { banner1, banner2, banner3, banner4, logo, product1, product2, product3, product4, testimonial1, testimonial2, testimonial3 } from '../../assets/index';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const Landing = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is800 = useMediaQuery(theme.breakpoints.down(800));
  const is1200 = useMediaQuery(theme.breakpoints.down(1200));

  const bannerImages = [banner1, banner3, banner2, banner4];
  const productImages = [product1, product2, product3, product4];
  const testimonialImages = [testimonial1, testimonial2, testimonial3];

  // Handles user redirection
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser, navigate]);

  // Handles login error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(() => {
    if (status === 'fullfilled' && loggedInUser?.isVerified === true) {
      toast.success(`Login successful`);
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status, loggedInUser, dispatch, reset]);



  return (
    <>
      {/* Banners Section */}
      {!is600 &&
        <Stack sx={{ width: "100%", height: is800 ? "300px" : is1200 ? "400px" : "500px" }}>
          <ProductBanner images={bannerImages} />
        </Stack>
      }

      {/* About Section */}
      <Box sx={{ padding: 4, textAlign: 'center', marginTop: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', margin: '0 auto', marginBottom: 2 }}>
          We are Seamoss Primed, your go-to destination for premium sea moss products. Our mission is to provide you with high-quality sea moss that supports your health and wellness goals. Discover the benefits of our sea moss and experience the difference in your daily life. Our products are sourced sustainably and crafted with care to ensure the highest standards of quality.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <img src={logo} alt="About Us" style={{ width: '200px', borderRadius: '8px' }} />
          {/* Display a few product images */}
          {productImages.slice(0, 2).map((image, index) => (
            <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '200px', borderRadius: '8px' }} />
          ))}
        </Stack>
      </Box>

      {/* Product Showcase Section */}
      <Box sx={{ padding: 4, textAlign: 'center', backgroundColor: '#e0f7fa' }}>
        <Typography variant="h4" gutterBottom>
          Discover Our Premium Products
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', margin: '0 auto', marginBottom: 2 }}>
          Explore our range of premium sea moss products that are carefully crafted to meet your health and wellness needs. From raw sea moss to our specially formulated supplements, we offer a variety of options to suit your preferences.
        </Typography>
        <Stack alignItems="center" spacing={2}>
          {/* Display testimonial images horizontally */}
          <Stack direction="row" spacing={2} justifyContent="center">
            {testimonialImages.map((image, index) => (
              <img key={index} src={image} alt={`Testimonial ${index + 1}`} style={{ width: '300px', borderRadius: '8px', marginBottom: '16px' }} />
            ))}
          </Stack>
          <Button
            variant="contained"
            component={Link}
            to="/signup"
            sx={{ backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }}
          >
            Get Started
          </Button>
        </Stack>
      </Box>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/72139155" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <Button
          variant="contained"
          sx={{ borderRadius: '50%', width: 56, height: 56, backgroundColor: '#25D366', boxShadow: 3 }}
        >
          <WhatsAppIcon sx={{ color: 'white' }} />
        </Button>
      </a>
    </>
  );
}
