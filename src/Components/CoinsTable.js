import React, { useEffect } from 'react'
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { Container, LinearProgress, Table, TableHead, TableCell, TableContainer, TableRow, TextField, ThemeProvider, Typography, createTheme, TableBody, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

const numberWithCommas = (row) => {
    const formattedNumber = row.current_price.toLocaleString();
    return formattedNumber;
};
const numberWithCommasMarketCap=(row)=>{
    const formattedNumber=(row.market_cap/1000000).toLocaleString();
    return formattedNumber;
}

const useStyles=makeStyles(()=>({
    row:{
        backgroundColor:"#16171a",
        cursor: "pointer",
        "&:hover":{
            backgroundColor:"#131111"
        },
        fontFamily:"Monserrat"
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color:"gold"
        },
    }
  }));

const CoinsTable = () => {
    
    const [search,setSearch] = useState();
    const [page,setPage]=useState(1);

    const classes=useStyles();

    const {currency,symbol,coins,loading,fetchCoins}=CryptoState();

    const navigate=useNavigate();

    

    console.log(coins)
    
    useEffect(()=>{
        fetchCoins();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency])

    const darkTheme=createTheme({
        palette:{
          primary:{
            main:"#fff"
          },
          type:"dark"
        }
      });

      const handleSearch=()=>{
        if (!search) {
            return coins;
          } 
          else {
            return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search)||coin.symbol.toLowerCase().includes(search)
        ))
        }
      }

      
      
  return (
  <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign: "center"}}>
        <Typography variant="h4" style={{margin: 18, fontFamily:"Montserrat"}}>
            Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField label="Search for a Cryptocurrency..." variant="outlined" style={{marginBottom: 20, width: "100%"}} onChange={(e)=>setSearch(e.target.value)}/>

        <TableContainer>
            {
                loading?(<LinearProgress style={{backgroundColor:"gold"}}/>):(
                    <>
                    <Table>
                        <TableHead style={{backgroundColor: "#EEBC1D"}}>
                            <TableRow>
                                {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                    <TableCell style={{color:"black",fontWeight:"700",fontFamily:"Montserrat"}} key={head} align={head==="Coin"?"":"right"}>    
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                                const profit=row.price_change_percentage_24h > 0;

                                return(
                                    <TableRow onClick={()=>navigate(`/coins/${row.id}`)} className={classes.row} key={row.name}>
                                        <TableCell component="th" scope="row" style={{display: "flex", gap:15}}>
                                            <img src={row.image} alt={row.name} height="50" style={{marginBottom: 10}}/>
                                            <div style={{display:"flex",flexDirection:"column"}}>
                                                <span style={{textTransform:"uppercase", fontSize: 22}}>
                                                    {row.symbol}
                                                </span>
                                                <span style={{color: "darkgrey"}}>{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row)}
                                        </TableCell>
                                        <TableCell align="right" style={{color: profit>0 ? "rgb(14,203,129)":"red", fontWeight: 500}}>
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommasMarketCap(row)}M
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    </>
                )
            }
        </TableContainer>

        <Pagination classes={{ul: classes.pagination}} count={(handleSearch().length/10).toFixed(0)} style={{padding: 20, width:"100%", display: "flex", justifyContent: "center"}} onChange={(_,value)=>{setPage(value); window.scroll(0,450);}}/>
    </Container>
  </ThemeProvider>
)};

export default CoinsTable
