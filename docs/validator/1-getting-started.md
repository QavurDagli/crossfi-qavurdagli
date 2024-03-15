---
title: Getting Started
description: Node installation guide.
sidebar_position: 2
slug: /validator/getting-started
---

# Installation

## Updating the System
```shell
apt update && apt upgrade -y
```

## Installing the Necessary Libraries
```shell
apt install make clang pkg-config libssl-dev libclang-dev build-essential git curl ntp jq llvm tmux htop screen gcc lz4 -y < "/dev/null"
```

## Installing Go
```shell
ver="1.21.6"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
rm -rf /usr/local/go
tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm -rf "go$ver.linux-amd64.tar.gz"
echo 'export GOROOT=/usr/local/go' >> $HOME/.bash_profile
echo 'export GOPATH=$HOME/go' >> $HOME/.bash_profile
echo 'export GO111MODULE=on' >> $HOME/.bash_profile
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bash_profile
source $HOME/.bash_profile
go version
```

## Setting Variables
The areas you need to change are written below.
* `$CFI_NODENAME` your validator name
* `$CFI_WALLET` your wallet name
*  If another node is using the port, you can change it below. You must enter a different value where it says `11`, again as two digits.
```shell
echo "export CFI_NODENAME=$CFI_NODENAME"  >> $HOME/.bash_profile
echo "export CFI_WALLET=$CFI_WALLET" >> $HOME/.bash_profile
echo "export CFI_PORT=11" >> $HOME/.bash_profile
echo "export CFI_CHAIN_ID=crossfi-evm-testnet-1" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

### Sample
Let's assume that your Node (`CFI_NODENAME`) and Wallet (`CFI_WALLET`) name is `Anatolian-Guide` and the port you will use (`CFI_PORT`) will be `16656`. The code will be arranged as shown below.
```shell
echo "export CFI_NODENAME=Anatolian-Guide"  >> $HOME/.bash_profile
echo "export CFI_WALLET=Anatolian-Guide" >> $HOME/.bash_profile
echo "export CFI_PORT=16" >> $HOME/.bash_profile
echo "export CFI_CHAIN_ID=crossfi-evm-testnet-1" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

## Installing CrossFi
```
cd $HOME
mkdir -p $HOME/go/bin
curl -L https://github.com/crossfichain/crossfi-node/releases/download/v0.3.0-prebuild3/crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz > crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz
tar -xvzf crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz
chmod +x $HOME/bin/crossfid
mv $HOME/bin/crossfid $HOME/go/bin
rm -rf crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz readme.md $HOME/bin
crossfid version
```
The version output will be `0.3.0-prebuild3`.

## Configuring and Launching the Node
We copy and paste the codes below without making any changes.
```
crossfid config keyring-backend test
crossfid config chain-id $CFI_CHAIN_ID
crossfid init --chain-id $CFI_CHAIN_ID $CFI_NODENAME

# Copying the Genesis and addrbook Files
wget https://github.com/qavurdagli/crossfi-qavurdagli-Services/raw/main/docs/Testnet/Cosmos-Ecosystem/crossfi/files/genesis.json -O $HOME/.mineplex-chain/config/genesis.json
wget https://github.com/qavurdagli/crossfi-qavurdagli-Services/raw/main/docs/Testnet/Cosmos-Ecosystem/crossfi/files/addrbook.json -O $HOME/.mineplex-chain/config/addrbook.json

# Set up the minimum gas price
sed -i -e 's|^minimum-gas-prices *=.*|minimum-gas-prices = "5000000000mpx"|' $HOME/.mineplex-chain/config/app.toml

# Closing Indexer-Optional
indexer="null"
sed -i -e "s/^indexer *=.*/indexer = \"$indexer\"/" $HOME/.mineplex-chain/config/config.toml

# Set up SEED and PEERS
SEEDS="89752fa7945a06e972d7d860222a5eeaeab5c357@128.140.70.97:26656,dd83e3c7c4e783f8a46dbb010ec8853135d29df0@crossfi-testnet-seed.itrocket.net:36656"
sed -i 's|^seeds *=.*|seeds = "'$SEEDS'"|; s|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/.mineplex-chain/config/config.toml

# Enabling Prometheus
sed -i 's|^prometheus *=.*|prometheus = true|' $HOME/.mineplex-chain/config/config.toml

# Set up Pruning 
pruning="custom"
pruning_keep_recent="100"
pruning_keep_every="0"
pruning_interval="50"
sed -i -e "s/^pruning *=.*/pruning = \"$pruning\"/" $HOME/.mineplex-chain/config/app.toml
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \"$pruning_keep_recent\"/" $HOME/.mineplex-chain/config/app.toml
sed -i -e "s/^pruning-keep-every *=.*/pruning-keep-every = \"$pruning_keep_every\"/" $HOME/.mineplex-chain/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \"$pruning_interval\"/" $HOME/.mineplex-chain/config/app.toml

# Set up Ports
sed -i.bak -e "
s%:26658%:${CFI_PORT}658%g;
s%:26657%:${CFI_PORT}657%g;
s%:6060%:${CFI_PORT}060%g;
s%:26656%:${CFI_PORT}656%g;
s%:26660%:${CFI_PORT}660%g
" $HOME/.mineplex-chain/config/config.toml
sed -i.bak -e "
s%:1317%:${CFI_PORT}317%g; 
s%:8080%:${CFI_PORT}080%g; 
s%:9090%:${CFI_PORT}090%g; 
s%:9091%:${CFI_PORT}091%g
" $HOME/.mineplex-chain/config/app.toml
sed -i.bak -e "s%:26657%:${CFI_PORT}657%g" $HOME/.mineplex-chain/config/client.toml

# Adding External Address
PUB_IP=`curl -s -4 icanhazip.com`
sed -e "s|external_address = \".*\"|external_address = \"$PUB_IP:${CFI_PORT}656\"|g" ~/.mineplex-chain/config/config.toml > ~/.mineplex-chain/config/config.toml.tmp
mv ~/.mineplex-chain/config/config.toml.tmp  ~/.mineplex-chain/config/config.toml

# Creating the Service File
tee /etc/systemd/system/crossfid.service > /dev/null << EOF
[Unit]
Description=CrossFi Node
After=network-online.target

[Service]
User=$USER
ExecStart=$(which crossfid) start
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

## Enabling and Starting the Service
```shell
systemctl daemon-reload
systemctl enable crossfid
systemctl start crossfid
```

## Checking the Logs
```shell
journalctl -u crossfid -f -o cat
```  

:::warning
AFTER THIS STAGE, WE EXPECT OUR NODE TO SYNC.
:::

## Checking Synchronization
Unless we get a `false` output, we do not move on to the next step, namely creating a validator.
```shell
crossfid status 2>&1 | jq .SyncInfo
```

## Wallet

### Creating a New Wallet
We do not change the `$CFI_WALLET` section, we named our wallet with variables at the beginning of the installation.
```shell 
crossfid keys add $CFI_WALLET
```  

### Importing an Existing Wallet
```shell
crossfid keys add $CFI_WALLET --recover
```

## Wallet and Valoper Info
Here we add our wallet and valve information to the variable.

```shell
CFI_WALLET_ADDRESS=$(crossfid keys show $CFI_WALLET -a)
CFI_VALOPER_ADDRESS=$(crossfid keys show $CFI_WALLET --bech val -a)
```

```shell
echo 'export CFI_WALLET_ADDRESS='${CFI_WALLET_ADDRESS} >> $HOME/.bash_profile
echo 'export CFI_VALOPER_ADDRESS='${CFI_VALOPER_ADDRESS} >> $HOME/.bash_profile
source $HOME/.bash_profile
```

### Checking Wallet Balance
```
crossfid query bank balances $CFI_WALLET_ADDRESS
```

:::warning
If the synchronization is completed, we proceed to the following step.
:::

## Creating Validator
You do not need to make any changes to the following command other than the places specified below;
    - `identity` where it says `XXXX1111XXXX1111` you write your identification number given to you as a member of the [keybase](https://keybase.io/) site.
    - `details` You can write information about yourself where it says `Always forward with the Anatolian Team 🚀`.
    - `website` where it says `https://anatolianteam.com`, if you have a website or twitter etc. You can write your address.
    - `security-contact` Your email address.
 ```shell 
crossfid tx staking create-validator \
--amount=940000mpx  \
--pubkey=$(crossfid tendermint show-validator) \
--moniker=$CFI_NODENAME \
--chain-id=$CFI_CHAIN_ID \
--commission-rate=0.10 \
--commission-max-rate=0.20 \
--commission-max-change-rate=0.05 \
--min-self-delegation="1" \
--gas-prices=0.25mpx  \
--gas-adjustment=1.5 \
--gas=auto \
--from=$CFI_WALLET \
--details="Always forward with the Anatolian Team 🚀" \
--security-contact="xxxxxxx@gmail.com" \
--website="https://anatolianteam.com" \
--identity="XXXX1111XXXX1111" \
--yes
```

## Completely Deleting the Node 
```shell 
systemctl stop crossfid && \
systemctl disable crossfid && \
rm /etc/systemd/system/crossfid.service && \
systemctl daemon-reload && \
cd $HOME && \
rm -rf .mineplex-chain crossfi && \
rm -rf $(which crossfid)
sed -i '/CFI_/d' ~/.bash_profile
```
