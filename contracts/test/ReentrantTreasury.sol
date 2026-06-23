// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface INonprofitDonation {
    function withdrawAll() external;
    function acceptOwnership() external;
}

contract ReentrantTreasury {
    INonprofitDonation public target;
    bool public attackEnabled;
    uint256 public reentryAttempts;
    uint256 public reentryFailures;

    constructor(INonprofitDonation target_) {
        target = target_;
    }

    function setAttackEnabled(bool enabled) external {
        attackEnabled = enabled;
    }

    function acceptOwnership() external {
        target.acceptOwnership();
    }

    function attackWithdrawAll() external {
        target.withdrawAll();
    }

    receive() external payable {
        if (attackEnabled) {
            reentryAttempts++;
            try target.withdrawAll() {} catch {
                reentryFailures++;
            }
        }
    }
}
