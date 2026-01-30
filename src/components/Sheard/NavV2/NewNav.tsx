"use client";

import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Container,
    Box,
    Typography,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    Badge,
    Avatar,
    Button,
    Menu,
    MenuItem,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer,
    useMediaQuery,
    Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/authService";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TProduct } from "@/types/global";
import NavCartModal from "./NavCartModal";
import { useDebounce } from "@/hooks/useDebounce";

const AuthButton = dynamic(
    () => import("@/components/ui/AuthButton/AuthButton"),
    { ssr: false }
);

const NewNav = () => {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width:900px)");
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const carts = useAppSelector((state) => state.cart.carts);

    // Debounce search query to prevent excessive API calls
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Fetch products for search - only when debounced query changes
    const { data: productsData, isFetching: isSearching } = useGetAllProductsQuery({
        search: debouncedSearchQuery,
        limit: 5,
    }, {
        skip: !debouncedSearchQuery, // Skip query if search is empty
    });

    useEffect(() => {
        const userInfoData = getUserInfo();
        setUserInfo(userInfoData);
    }, []);

    const searchResults = productsData?.data?.result || [];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setShowSearchResults(e.target.value.length > 0);
    };

    const handleProductClick = (productId: string) => {
        router.push(`/products/${productId}`);
        setSearchQuery("");
        setShowSearchResults(false);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleCartOpen = () => {
        setCartOpen(true);
    };

    const handleCartClose = () => {
        setCartOpen(false);
    };

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Flash Sale", path: "/flash-sale" },
        { title: "Products", path: "/products" },
        ...(userInfo?.role === "admin"
            ? [{ title: "Dashboard", path: "/dashboard" }]
            : userInfo
                ? [{ title: "Profile", path: "/profile" }]
                : []),
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
            <Typography
                variant="h5"
                component={Link}
                href="/"
                fontWeight={600}
                sx={{ mb: 3, display: "block" }}
            >
                Fabric{" "}
                <Box component="span" color="primary.main">
                    finesse
                </Box>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
                {navLinks.map((link) => (
                    <ListItem key={link.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={link.path}
                            sx={{ textAlign: "center" }}
                        >
                            <ListItemText primary={link.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
            >
                <Container>
                    {/* Top Navigation */}
                    <Toolbar sx={{ py: 1 }}>
                        {/* Mobile Menu Icon */}
                        {isMobile && (
                            <IconButton
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                        {/* Logo */}
                        <Typography
                            variant={isMobile ? "h6" : "h4"}
                            component={Link}
                            href="/"
                            fontWeight={600}
                            color="black"
                            sx={{ textDecoration: "none", mr: { xs: 1, md: 4 } }}
                        >
                            Fabric{" "}
                            <Box component="span" color="primary.main">
                                finesse
                            </Box>
                        </Typography>

                        {/* Search Field */}
                        {!isMobile && (
                            <Box sx={{ flexGrow: 1, maxWidth: 600, position: "relative" }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search for products..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onBlur={() => {
                                        setTimeout(() => setShowSearchResults(false), 200);
                                    }}
                                    onFocus={() => {
                                        if (searchQuery.length > 0) setShowSearchResults(true);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            bgcolor: "#f5f5f5",
                                            borderRadius: 2,
                                            "& fieldset": { border: "none" },
                                        },
                                    }}
                                />

                                {/* Search Results Dropdown */}
                                {showSearchResults && (
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            right: 0,
                                            mt: 1,
                                            maxHeight: 400,
                                            overflow: "auto",
                                            zIndex: 1000,
                                        }}
                                    >
                                        {searchResults.length > 0 ? (
                                            <>
                                                <List>
                                                    {searchResults.map((product: TProduct) => (
                                                        <ListItemButton
                                                            key={product._id}
                                                            onClick={() => handleProductClick(product._id)}
                                                            sx={{
                                                                "&:hover": {
                                                                    bgcolor: "#f5f5f5",
                                                                },
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 2,
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        position: "relative",
                                                                        width: 50,
                                                                        height: 50,
                                                                        flexShrink: 0,
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={product.images[0] || "/placeholder.png"}
                                                                        alt={product.name}
                                                                        fill
                                                                        style={{ objectFit: "cover", borderRadius: 8 }}
                                                                    />
                                                                </Box>
                                                                <Box sx={{ flexGrow: 1 }}>
                                                                    <Typography
                                                                        variant="body1"
                                                                        fontWeight={500}
                                                                        color="black"
                                                                    >
                                                                        {product.name}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        ${product.discountPrice || product.price}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                                <Box sx={{ p: 1, borderTop: "1px solid #e0e0e0" }}>
                                                    <Button
                                                        fullWidth
                                                        size="small"
                                                        onClick={() => {
                                                            router.push(
                                                                `/products?searchTerm=${encodeURIComponent(
                                                                    searchQuery
                                                                )}`
                                                            );
                                                            setShowSearchResults(false);
                                                        }}
                                                    >
                                                        View all results
                                                    </Button>
                                                </Box>
                                            </>
                                        ) : (
                                            <Box sx={{ p: 3, textAlign: "center" }}>
                                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                                    No products available
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {
                                                        router.push("/products");
                                                        setShowSearchResults(false);
                                                        setSearchQuery("");
                                                    }}
                                                >
                                                    View All Products
                                                </Button>
                                            </Box>
                                        )}
                                    </Paper>
                                )}
                            </Box>
                        )}

                        {/* Right Side Buttons */}
                        <Stack direction="row" spacing={4} sx={{ ml: "auto" }} alignItems={'center'}>
                            {/* Cart Button */}
                            <Box
                                onClick={handleCartOpen}
                                sx={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    padding: {
                                        xs: '2px 10px',
                                        md: '5px 50px'
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <Badge badgeContent={carts.length} color="primary">
                                    <ShoppingCartIcon sx={{ color: 'black' }} />
                                </Badge>
                            </Box>

                            {/* User Profile / Login */}
                            <AuthButton />
                        </Stack>
                    </Toolbar>

                    {/* Mobile Search */}
                    {isMobile && (
                        <Box sx={{ pb: 2, position: "relative" }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onBlur={() => {
                                    setTimeout(() => setShowSearchResults(false), 200);
                                }}
                                onFocus={() => {
                                    if (searchQuery.length > 0) setShowSearchResults(true);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        bgcolor: "#f5f5f5",
                                        borderRadius: 2,
                                        "& fieldset": { border: "none" },
                                    },
                                }}
                            />

                            {/* Mobile Search Results */}
                            {showSearchResults && (
                                <Paper
                                    elevation={3}
                                    sx={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                        mt: 1,
                                        maxHeight: 300,
                                        overflow: "auto",
                                        zIndex: 1000,
                                    }}
                                >
                                    {searchResults.length > 0 ? (
                                        <List>
                                            {searchResults.map((product: TProduct) => (
                                                <ListItemButton
                                                    key={product._id}
                                                    onClick={() => handleProductClick(product._id)}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1,
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                position: "relative",
                                                                width: 40,
                                                                height: 40,
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            <Image
                                                                src={product.images[0] || "/placeholder.png"}
                                                                alt={product.name}
                                                                fill
                                                                style={{ objectFit: "cover", borderRadius: 8 }}
                                                            />
                                                        </Box>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography
                                                                variant="body2"
                                                                fontWeight={500}
                                                                color="black"
                                                            >
                                                                {product.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                ${product.discountPrice || product.price}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    ) : (
                                        <Box sx={{ p: 1, textAlign: "center", }}>
                                            <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                                                No products available
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => {
                                                    router.push("/products");
                                                    setShowSearchResults(false);
                                                    setSearchQuery("");
                                                }}
                                            >
                                                View All Products
                                            </Button>
                                        </Box>
                                    )}
                                </Paper>
                            )}
                        </Box>
                    )}

                    {/* Bottom Navigation Links - Desktop Only */}
                    {!isMobile && (
                        <Box sx={{ borderTop: "1px solid #e0e0e0", py: 1 }}>
                            <Stack
                                direction="row"
                                spacing={4}
                                justifyContent="center"
                                alignItems="center"
                            >
                                {navLinks.map((link) => (
                                    <Typography
                                        key={link.path}
                                        component={Link}
                                        href={link.path}
                                        variant="body1"
                                        fontWeight={500}
                                        sx={{
                                            textDecoration: "none",
                                            color: "text.primary",
                                            "&:hover": {
                                                color: "primary.main",
                                            },
                                            transition: "color 0.2s",
                                        }}
                                    >
                                        {link.title}
                                    </Typography>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 240,
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Cart Modal */}
            <NavCartModal open={cartOpen} onClose={handleCartClose} />
        </>
    );
};

export default NewNav;