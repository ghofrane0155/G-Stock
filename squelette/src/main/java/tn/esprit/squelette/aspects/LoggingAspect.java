package tn.esprit.squelette.aspects;


import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

    @AfterReturning("execution(public * tn.esprit.squelette.services.*.add*(..))")
    public void logMethodExit(JoinPoint joinPoint)
    {
        String name = joinPoint.getSignature().getName();
        log.info("la méthode d'ajout : " + name + " s'est bien déroulée" );
    }
}
