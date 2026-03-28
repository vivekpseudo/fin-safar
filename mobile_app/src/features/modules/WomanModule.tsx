import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import {
  Home as HomeIcon,
  CheckCircle,
  X,
  BookOpen,
} from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface WomanModuleProps {
  onComplete: (score: number, badge: string) => void;
}

export const WomanModule: React.FC<WomanModuleProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<'budget' | 'fraud'>('budget');
  const [_budgetScore, setBudgetScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Budget Game State
  const [funds, setFunds] = useState({ household: 0, business: 0 });
  const [currentMoney, setCurrentMoney] = useState(5000);

  // Fraud Quiz State
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Animation for fraud tab fade-in
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    if (completed) {
        const timer = setTimeout(() => {
            onComplete(100, 'Safety Star'); 
        }, 1500); 

        return () => clearTimeout(timer);
    }
}, [completed, onComplete]);


  const handleAllocate = (type: 'household' | 'business') => {
    if (currentMoney <= 0) return;
    setFunds(prev => ({ ...prev, [type]: prev[type] + 1000 }));
    setCurrentMoney(prev => prev - 1000);
  };


  const checkBudget = () => {
    const balanced = funds.business >= 2000 && funds.household >= 2000;
    if (balanced) {
      setBudgetScore(50);
      setTab('fraud');
      // Trigger fade-in animation like web's animate-fadeIn
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      
      Alert.alert('', t('modules.woman.budget.alert'), [
        {
          text: 'OK',
          onPress: () => {
            setFunds({ household: 0, business: 0 });
            setCurrentMoney(5000);
          },
        },
      ]);
    }
  };

  const handleQuiz = (safe: boolean) => {
    setQuizAnswered(true);
    setIsCorrect(safe);
    if (safe) {
      setCompleted(true);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Intro Card - matches web's purple banner */}
      <View style={styles.introCard}>
        <View style={styles.introHeader}>
          <HomeIcon size={20} color="#6b21a8" />
          <Text style={styles.introTitle}>{t('modules.woman.mission')}</Text>
        </View>
        <Text style={styles.introDesc}>{t('modules.woman.desc')}</Text>
      </View>

      {/* ───── BUDGET TAB ───── */}
      {tab === 'budget' && (
        <View style={styles.sectionGap}>
          {/* Money to sort */}
          <View style={styles.budgetStatus}>
            <Text style={styles.budgetLabel}>
              {t('modules.woman.budget.toSort')}
            </Text>
            <Text style={styles.budgetAmount}>₹{currentMoney}</Text>
          </View>

          {/* Two jars side by side - matches web's grid-cols-2 */}
          <View style={styles.jarsContainer}>
            {/* Household Jar */}
            <View style={styles.jarCardBlue}>
              <Text style={styles.jarTitleBlue}>
                {t('modules.woman.budget.household')}
              </Text>
              <Text style={styles.jarAmountBlue}>₹{funds.household}</Text>
              <Button
                onClick={() => handleAllocate('household')}
                disabled={currentMoney <= 0}
                style={styles.btnBlue}
              >
                <Text style={styles.btnText}>
                  {t('modules.woman.budget.add')}
                </Text>
              </Button>
            </View>

            {/* Business Jar */}
            <View style={styles.jarCardOrange}>
              <Text style={styles.jarTitleOrange}>
                {t('modules.woman.budget.business')}
              </Text>
              <Text style={styles.jarAmountOrange}>₹{funds.business}</Text>
              <Button
                onClick={() => handleAllocate('business')}
                disabled={currentMoney <= 0}
                style={styles.btnOrange}
              >
                <Text style={styles.btnText}>
                  {t('modules.woman.budget.add')}
                </Text>
              </Button>
            </View>
          </View>

          {/* Check button appears only when money is fully allocated */}
          {currentMoney === 0 && (
            <Button onClick={checkBudget} style={styles.checkBtn}>
              <Text style={styles.btnText}>
                {t('modules.woman.budget.check')}
              </Text>
            </Button>
          )}
        </View>
      )}

      {/* ───── FRAUD TAB ───── */}
      {tab === 'fraud' && (
        <Animated.View style={[styles.sectionGap, { opacity: fadeAnim }]}>
          <Text style={styles.fraudTitle}>
            {t('modules.woman.fraud.title')}
          </Text>

          {/* Quiz card - matches web's white card with border + shadow */}
          <View style={styles.quizCard}>
            <Text style={styles.quizQuestion}>
              {t('modules.woman.fraud.question')}
            </Text>

            {!quizAnswered ? (
              <View style={styles.quizActions}>
                <Button
                  style={styles.dangerBtn}
                  onClick={() => handleQuiz(false)}
                >
                  <Text style={styles.btnText}>
                    {t('modules.woman.fraud.btnTell')}
                  </Text>
                </Button>
                <Button
                  style={styles.successBtn}
                  onClick={() => handleQuiz(true)}
                >
                  <Text style={styles.btnText}>
                    {t('modules.woman.fraud.btnDisconnect')}
                  </Text>
                </Button>
              </View>
            ) : (
              <View
                style={[
                  styles.resultBox,
                  isCorrect ? styles.resultCorrect : styles.resultIncorrect,
                ]}
              >
                <View style={styles.resultRow}>
                  {isCorrect ? (
                    <>
                      <CheckCircle size={20} color="#166534" />
                      <Text style={styles.resultTextCorrect}>
                        {t('modules.woman.fraud.correct')}
                      </Text>
                    </>
                  ) : (
                    <>
                      <X size={20} color="#991b1b" />
                      <Text style={styles.resultTextIncorrect}>
                        {t('modules.woman.fraud.incorrect')}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Lesson card - matches web's yellow box */}
          {completed && (
            <View style={styles.lessonCard}>
              <BookOpen
                size={16}
                color="#854d0e"
                style={styles.lessonIcon}
              />
              <Text style={styles.lessonText}>
                <Text style={styles.lessonBold}>Lesson: </Text>
                {t('modules.woman.fraud.lesson')}
              </Text>
            </View>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  /* ── Layout ── */
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 48,
  },
  sectionGap: {
    gap: 24,
  },

  /* ── Intro Card ── */
  introCard: {
    backgroundColor: '#faf5ff',
    borderLeftWidth: 4,
    borderLeftColor: '#a855f7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  introTitle: {
    fontWeight: '700',
    color: '#6b21a8',
    fontSize: 16,
  },
  introDesc: {
    fontSize: 14,
    color: '#7e22ce',
  },

  /* ── Budget Status ── */
  budgetStatus: {
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  budgetAmount: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1e293b',
  },

  /* ── Jars Grid ── */
  jarsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  jarCardBlue: {
    flex: 1,
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  jarTitleBlue: {
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  jarAmountBlue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 12,
  },
  btnBlue: {
    backgroundColor: '#2563eb',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  jarCardOrange: {
    flex: 1,
    backgroundColor: '#fff7ed',
    borderWidth: 2,
    borderColor: '#ffedd5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  jarTitleOrange: {
    fontWeight: '700',
    color: '#9a3412',
    marginBottom: 8,
  },
  jarAmountOrange: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ea580c',
    marginBottom: 12,
  },
  btnOrange: {
    backgroundColor: '#ea580c',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  /* ── Check Budget Button ── */
  checkBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  /* ── Fraud Section ── */
  fraudTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  quizCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 16,
    lineHeight: 24,
  },
  quizActions: {
    gap: 12,
  },
  dangerBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  successBtn: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  /* ── Result Box ── */
  resultBox: {
    padding: 16,
    borderRadius: 8,
  },
  resultCorrect: {
    backgroundColor: '#dcfce7',
  },
  resultIncorrect: {
    backgroundColor: '#fee2e2',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultTextCorrect: {
    color: '#166534',
    fontWeight: '600',
    fontSize: 15,
  },
  resultTextIncorrect: {
    color: '#991b1b',
    fontWeight: '600',
    fontSize: 15,
  },

  /* ── Lesson Card ── */
  lessonCard: {
    backgroundColor: '#fefce8',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  lessonIcon: {
    marginTop: 2,
  },
  lessonText: {
    flex: 1,
    color: '#854d0e',
    fontSize: 14,
    lineHeight: 20,
  },
  lessonBold: {
    fontWeight: '700',
  },

  /* ── Shared Button Text ── */
  btnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
});