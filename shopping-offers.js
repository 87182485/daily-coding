/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */

 /**
  * Leetcode 638
  * dfs with memo.
  */
var shoppingOffers = function(price, special, needs) {
    const map = new Map();
    
    return dfs(price, special, map, needs);
};

function dfs(price, special, needPriceMap, needs) {
    const key = convertNeedtoKey(needs);
    
    if (needPriceMap.has(key)) {
        return needPriceMap.get(key);
    }
    
    let currentPrice = getPrice(needs, price);
    
    const len = price.length;

    for(const offer of special) {
        const offerPrice = offer[len];
        const offerQuantities = offer.slice(0, len);
        
        if(isValid(offerQuantities, needs)) {
            const nextNeeds = needs.map((need, index) => need-offerQuantities[index]);
            currentPrice = Math.min(currentPrice, offerPrice + dfs(price, special, needPriceMap, nextNeeds));
        }
    }
    
    needPriceMap.set(key, currentPrice);
    
    return currentPrice;
}

function convertNeedtoKey(needs) {
    return needs.join('-');
}

function getPrice(needs, prices) {
    return needs.reduce((total, q, index) => {
        return total+q*prices[index];
    }, 0);
}

function isValid(quantities, needs) {
    const len = quantities.length;
    
    for(let i=0;i<len;i++) {
        if(quantities[i]>needs[i]) {
            return false;
        }
    }
    
    return true;
}