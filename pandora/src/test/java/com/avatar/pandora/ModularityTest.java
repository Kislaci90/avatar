package com.avatar.pandora;

import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;

class ModularityTest {
    @Test
    void verifiesModularStructure() {
        ApplicationModules.of(PandoraApplication.class).verify();
    }
}
