import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from "@material-ui/core/Typography"
import WalletIcon from "@material-ui/icons/AccountBalanceWallet"
import { makeStyles } from "@material-ui/core/styles"
import { theme } from '../../../theme';

const WalletButton = ({ provider, loadWeb3Modal, logoutOfWeb3Modal }) => {

    return (
        <div>
            <Button
                size="large"
                variant="outlined" 
                color="primary"
                onClick={() => {
                    if (!provider) {
                    loadWeb3Modal();
                    } else {
                    logoutOfWeb3Modal();
                    }
                }}
                style={{color: theme.palette.text.primary}}
                >
                {!provider ? 
                        "Connect Wallet"
                : 
                        "Disconnect Wallet"
                }
            </Button>
        </div>
    )
};

export default WalletButton;
