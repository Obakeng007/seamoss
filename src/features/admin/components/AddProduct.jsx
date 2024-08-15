import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../products/ProductSlice';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { toast } from 'react-toastify';

export const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [productImagesBase64, setProductImagesBase64] = useState([]);

  useEffect(() => {
    if (productAddStatus === 'fulfilled') {
      reset();
      toast.success('New product added');
      navigate('/admin/dashboard');
    } else if (productAddStatus === 'rejected') {
      toast.error('Error adding product, please try again later');
    }
  }, [productAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (validateFile(file)) {
        convertToBase64(file, setThumbnailBase64);
      } else {
        toast.error('Unsupported file type. Please select a JPG or PNG file.');
      }
    }
  };

  const handleProductImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (validateFile(file)) {
        convertToBase64(file, (base64) => {
          const updatedImages = [...productImagesBase64];
          updatedImages[index] = base64;
          setProductImagesBase64(updatedImages);
        });
      } else {
        toast.error('Unsupported file type. Please select a JPG or PNG file.');
      }
    }
  };

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);
    };
    reader.onerror = (error) => {
      console.error('Error converting file to base64:', error);
    };
  };

  const handleAddProduct = (data) => {
    const newProduct = {
      ...data,
      thumbnail: thumbnailBase64,
      images: productImagesBase64.filter(img => img), // Filter out empty strings
    };

    dispatch(addProductAsync(newProduct))
      .then(() => {
        reset();
        toast.success('New product added');
        navigate('/admin/dashboard');
      })
      .catch(() => {
        toast.error('Error adding product, please try again later');
      });
  };

  return (
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
      <Stack width={is1100 ? '100%' : '60rem'} rowGap={4} mt={is480 ? 4 : 6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}>
        {/* Form fields */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
            <TextField {...register("title", { required: 'Title is required' })} />
          </Stack>

          <Stack flexDirection={'row'}>
            <FormControl fullWidth>
              <InputLabel id="brand-selection">Brand</InputLabel>
              <Select {...register("brand", { required: "Brand is required" })} labelId="brand-selection" label="Brand">
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-selection">Category</InputLabel>
              <Select {...register("category", { required: "Category is required" })} labelId="category-selection" label="Category">
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Description</Typography>
            <TextField multiline rows={4} {...register("description", { required: "Description is required" })} />
          </Stack>

          <Stack flexDirection={'row'}>
            <Stack flex={1}>
              <Typography variant='h6' fontWeight={400} gutterBottom>Price</Typography>
              <TextField type='number' {...register("price", { required: "Price is required" })} />
            </Stack>
            <Stack flex={1}>
              <Typography variant='h6' fontWeight={400} gutterBottom>Discount {is480 ? '%' : 'Percentage'}</Typography>
              <TextField type='number' {...register("discountPercentage", { required: "Discount percentage is required" })} />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Stock Quantity</Typography>
            <TextField type='number' {...register("stockQuantity", { required: "Stock Quantity is required" })} />
          </Stack>

          <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Thumbnail</Typography>
            <input type='file' accept='.jpg,.jpeg,.png' onChange={handleThumbnailChange} />
          </Stack>

          <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Product Images</Typography>
            <Stack rowGap={2}>
              {[0, 1, 2, 3].map((index) => (
                <input key={index} type='file' accept='.jpg,.jpeg,.png' onChange={(e) => handleProductImageChange(index, e)} />
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Action buttons */}
        <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
          <Button size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Add Product</Button>
          <Button size={is480 ? 'medium' : 'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
