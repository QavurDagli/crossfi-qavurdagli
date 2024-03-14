---
title: Useful Commands
description: Useful commands.
sidebar_position: 5
---

# Cheatsheets 
:::note
If you have installed from our guide, you do not need to make any changes in the codes below unless stated otherwise.
:::

## Service Operations

### Checking Logs
```
journalctl -fu crossfid -o cat
```

### Starting Node
```
systemctl start crossfid
```

### Stopping the Node
```
systemctl stop crossfid
```

### Restarting the Node
```
systemctl restart crossfid
```

### Node Sync Status
```
crossfid status 2>&1 | jq .SyncInfo
```

### Node Information
```
crossfid status 2>&1 | jq .NodeInfo
```

### Learning Node ID
```
crossfid tendermint show-node-id
```

### Learning Node IP Address
```
curl icanhazip.com
```

### Your node peer
```
echo $(crossfid tendermint show-node-id)'@'$(wget -qO- eth0.me)':'$(cat $HOME/.mineplex-chain/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

## Wallet Management

### Viewing the List of Wallets
```
crossfid keys list
```

### Seeing Wallet Address
```
crossfid keys show $CFI_WALLET --bech val -a
```

### Importing Wallet
```
crossfid keys add $CFI_WALLET --recover
```

### Deleting Your Wallet
```
crossfid keys delete $CFI_WALLET
```

### Checking Wallet Balance
```
crossfid query bank balances $CFI_WALLET_ADDRESS
```

## Tokens

### Transferring from One Wallet to Another
```
crossfid tx bank send $CFI_WALLET_ADDRESS SENDING_CUZDAN_ADRESI 100000000mpx
```

### Participating in Proposal Voting
```
crossfid tx gov vote 1 yes --from $CFI_WALLET --chain-id=$CFI_CHAIN_ID --gas-prices 0.00001mpx --gas-adjustment 1.5 --gas auto -y
```

### Validatore Staking / Delegation
```
crossfid tx staking delegate $CFI_VALOPER_ADDRESS 100000000mpx --from=$CFI_WALLET --chain-id=$CFI_CHAIN_ID --gas-prices 0.00001mpx --gas-adjustment 1.5 --gas auto -y
```
### Unbonding
```
crossfid tx staking unbond $(crossfid keys show $CFI_WALLET --bech val -a) 1000000mpx --from $CFI_WALLET --chain-id indigo-1 --fees 3000mpx -y
```

### Staking / Redelegate from Current Validator to Other Validator
`srcValidatorAddress`: Address of the current staked validator
`destValidatorAddress`: Address of the new validator to be staked
```
crossfid tx staking redelegate srcValidatorAddress destValidatorAddress 100000000mpx --from=$CFI_WALLET --chain-id=$CFI_CHAIN_ID --gas-prices 0.00001mpx --gas-adjustment 1.5 --gas auto -y
```

### Withdraw Rewards
```
crossfid tx distribution withdraw-all-rewards --from=$CFI_WALLET --chain-id=$CFI_CHAIN_ID --gas-prices 0.00001mpx --gas-adjustment 1.5 --gas auto -y
```

### Withdrawing Commission Rewards

```
crossfid tx distribution withdraw-rewards $CFI_VALOPER_ADDRESS --from=$CFI_WALLET --commission --chain-id=$CFI_CHAIN_ID --gas-prices 0.00001mpx --gas-adjustment 1.5 --gas auto -y
```

## Validator operations

### Validator Information
```
crossfid status 2>&1 | jq .ValidatorInfo
```

### Changing Validator Name
Write your new validator/moniker name where it says 'NEW-NODE-NAME'. It should not contain TR characters.
```
crossfid tx staking edit-validator \
--new-moniker=NEW-NODE-NAME \
--chain-id=$CFI_CHAIN_ID \
--from=$CFI_WALLET \
--gas-prices 0.00001mpx \
--gas-adjustment 1.5 \
--gas auto -y
```

### Changing Validator Commission Rate
We change the value in the section that says 'commission-rate'.
```
crossfid tx staking edit-validator --commission-rate "0.02" --moniker=$CFI_NODENAME --from $CFI_WALLET --chain-id $CFI_CHAIN_ID --gas-prices 0.00001mpx --gas-adjustment 1.5 --gas auto - y
```

### Editing Your Validator Information
Before changing this information, you must register at https://keybase.io/ and receive your 16-digit code (XXXX0000XXXX0000) as seen in the code below. Also profile picture etc. You can also adjust the settings.
`$CFI_NODENAME` and `$CFI_WALLET`: Your Validator (Moniker) and wallet name, you do not need to change it. Because we added it to variables.
```
crossfid tx staking edit-validator \
--moniker=$CFI_NODENAME \
--identity=XXXX0000XXXX0000\
--website="YOU CAN WRITE YOUR WEBSITE IF YOU EXIST" \
--details="YOU CAN WRITE A SENTENCE INTRODUCING YOURSELF IN THIS SECTION" \
--chain-id=$CFI_CHAIN_ID \
--from=$CFI_WALLET
```

### Validator Details
```
crossfid q staking validator $(crossfid keys show $WALLET --bech val -a)
```

### Jailing info
```
crossfid q slashing signing-info $(crossfid tendermint show-validator)
```

### Slashing parameters
```
crossfid q slashing params
```

### Recovering Validator from Jail
```
crossfid tx slashing unjail --from $CFI_WALLET --chain-id $CFI_CHAIN_ID --gas-prices 0.00001mpx --gas-adjustment 1.5 --gas auto -y
```

### Active Validators List
```
crossfid q staking validators -oj --limit=2000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " 	 " + .description.moniker' | sort -gr | nl
```

### Checking Validator key
```
[[ $(crossfid q staking validator $VALOPER_ADDRESS -oj | jq -r .consensus_pubkey.key) = $(crossfid status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "Your key status is ok" || echo -e "Your key status is error"
```

### Signing info
```
crossfid q slashing signing-info $(crossfid tendermint show-validator)
```
